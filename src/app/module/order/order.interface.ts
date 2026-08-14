import type { OrderStatus, PaymentMethod, PaymentStatus } from "../../../generated/prisma/enums";

export interface ICreateOrderPayload {
	recipientName: string;
	phone: string;
	fullAddress: string;
	district: string;
	thana: string;
	shippingCharge: number;
	paymentMethod: PaymentMethod;
}

export interface IUpdateOrderStatusPayload {
	orderStatus?: OrderStatus;
	paymentStatus?: PaymentStatus;
	transactionId?: string;
}