import { prisma } from "../../lib/prisma";
import type { ICreateOrderPayload, IUpdateOrderStatusPayload } from "./order.interface";

const createOrder = async (userId: string, payload: ICreateOrderPayload) => {
	const cart = await prisma.cart.findUnique({
		where: { userId },
		include: {
			items: {
				include: { book: true },
			},
		},
	});

	if (!cart || cart.items.length === 0) {
		throw new Error("Your cart is empty");
	}

	let subtotal = 0;
	for (const item of cart.items) {
		const price = item.book.salePrice ? Number(item.book.salePrice) : Number(item.book.regularPrice);
		subtotal += price * item.quantity;
	}

	const totalAmount = subtotal + payload.shippingCharge;
	const orderNumber = `BM-${Date.now().toString().slice(-6)}`;

	const order = await prisma.$transaction(async (tx) => {
		const createdOrder = await tx.order.create({
			data: {
				orderNumber,
				userId,
				recipientName: payload.recipientName,
				phone: payload.phone,
				fullAddress: `${payload.fullAddress}, ${payload.thana}, ${payload.district}`,
				subtotal,
				shippingCharge: payload.shippingCharge,
				totalAmount,
				paymentMethod: payload.paymentMethod,
				paymentStatus: "UNPAID",
				orderStatus: "PENDING",
			},
		});

		// Create Order Items & Reduce Stock
		for (const item of cart.items) {
			const itemPrice = item.book.salePrice ? Number(item.book.salePrice) : Number(item.book.regularPrice);

			await tx.orderItem.create({
				data: {
					orderId: createdOrder.id,
					bookId: item.bookId,
					bookTitle: item.book.title,
					price: itemPrice,
					quantity: item.quantity,
					totalPrice: itemPrice * item.quantity,
				},
			});

			// Reduce stock
			await tx.book.update({
				where: { id: item.bookId },
				data: {
					stock: { decrement: item.quantity },
				},
			});
		}

		// Clear User Cart
		await tx.cartItem.deleteMany({
			where: { cartId: cart.id },
		});

		return createdOrder;
	});

	return await prisma.order.findUnique({
		where: { id: order.id },
		include: { items: true },
	});
};

// 2. Get Customer's Orders
const getMyOrders = async (userId: string) => {
	return await prisma.order.findMany({
		where: { userId },
		include: { items: true },
		orderBy: { createdAt: "desc" },
	});
};

// 3. Get Single Order by ID
const getOrderById = async (id: string) => {
	const order = await prisma.order.findUnique({
		where: { id },
		include: { items: true, user: { select: { name: true, email: true, phone: true } } },
	});

	if (!order) {
		throw new Error("Order not found");
	}

	return order;
};

// 4. Get All Orders (Admin Only)
const getAllOrdersAdmin = async () => {
	return await prisma.order.findMany({
		include: { user: { select: { name: true, email: true } }, items: true },
		orderBy: { createdAt: "desc" },
	});
};

// 5. Update Order / Payment Status (Admin Only)
const updateOrderStatusAdmin = async (id: string, payload: IUpdateOrderStatusPayload) => {
	return await prisma.order.update({
		where: { id },
		data: payload,
	});
};

export const OrderService = {
	createOrder,
	getMyOrders,
	getOrderById,
	getAllOrdersAdmin,
	updateOrderStatusAdmin,
};