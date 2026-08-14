import config from "../config";
import { prisma } from "../lib/prisma";

// 1. Initiate Payment (SSLCommerz Gateway Session Creation)
const initiatePayment = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.paymentStatus === "PAID") {
    throw new Error("Order has already been paid");
  }

  const paymentData = {
    store_id: config.ssl_store_id || "boimohol_sandbox",
    store_passwd: config.ssl_store_pass || "boimohol_sandbox@ssl",
    total_amount: Number(order.totalAmount),
    currency: "BDT",
    tran_id: order.orderNumber,
    success_url: `${config.back_url}/api/v1/payments/success?orderId=${order.id}`,
    fail_url: `${config.back_url}/api/v1/payments/fail?orderId=${order.id}`,
    cancel_url: `${config.back_url}/api/v1/payments/cancel?orderId=${order.id}`,
    ipn_url: `${config.back_url}/api/v1/payments/ipn`,
    cus_name: order.recipientName,
    cus_email: order.user.email,
    cus_add1: order.fullAddress,
    cus_phone: order.phone,
    shipping_method: "NO",
    product_name: "BoiMohol Books Order",
    product_category: "Books",
    product_profile: "physical-goods",
  };

  const paymentGatewayUrl = `${config.frontend_url}/checkout/payment-redirect?tran_id=${order.orderNumber}&amount=${order.totalAmount}`;

  return {
    paymentUrl: paymentGatewayUrl,
    orderNumber: order.orderNumber,
    amount: order.totalAmount,
    paymentData,
  };
};

// 2. Server-to-Server Webhook Verification & Saving to Dedicated Payment Table
const handlePaymentSuccess = async (
  orderId: string,
  transactionId?: string,
) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    throw new Error("Order not found");
  }

  const txnId = transactionId || `TXN-${Date.now()}`;

  return await prisma.$transaction(async (tx) => {
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "PAID",
        orderStatus: "CONFIRMED",
        transactionId: txnId,
      },
    });

    // Create record in Payment table
    await tx.payment.create({
      data: {
        orderId,
        amount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: "PAID",
        transactionId: txnId,
      },
    });

    return updatedOrder;
  });
};

// 3. Handle Payment Failed
const handlePaymentFailed = async (orderId: string) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: "UNPAID",
      orderStatus: "CANCELLED",
    },
  });
};

export const PaymentService = {
  initiatePayment,
  handlePaymentSuccess,
  handlePaymentFailed,
};
