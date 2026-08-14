export interface IAddToCartPayload {
	bookId: string;
	quantity: number;
}

export interface IUpdateCartItemPayload {
	quantity: number;
}