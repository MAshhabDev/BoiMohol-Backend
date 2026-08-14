
export interface IInitiatePaymentPayload {
	orderId: string;
}

export interface IPaymentCallbackPayload {
	tran_id: string;
	val_id?: string;
	amount?: string;
	card_type?: string;
	store_amount?: string;
	status: string;
}