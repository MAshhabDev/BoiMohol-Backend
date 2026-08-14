import { prisma } from "../../lib/prisma";
import type { IAddToCartPayload, IUpdateCartItemPayload } from "./cart.interface";

const getOrCreateCart = async (userId: string) => {
	let cart = await prisma.cart.findUnique({
		where: { userId },
		include: {
			items: {
				include: {
					book: true,
				},
				orderBy: { createdAt: "desc" },
			},
		},
	});

	if (!cart) {
		cart = await prisma.cart.create({
			data: { userId },
			include: {
				items: {
					include: { book: true },
				},
			},
		});
	}

	return cart;
};

const addToCart = async (userId: string, payload: IAddToCartPayload) => {
	const { bookId, quantity } = payload;

	const book = await prisma.book.findUnique({
		where: { id: bookId },
	});

	if (!book) {
		throw new Error("Book not found");
	}

	if (book.stock < quantity) {
		throw new Error("Not enough stock available");
	}

	const cart = await getOrCreateCart(userId);

	// Check if item already exists in cart
	const existingItem = await prisma.cartItem.findFirst({
		where: {
			cartId: cart.id,
			bookId,
		},
	});

	if (existingItem) {
		await prisma.cartItem.update({
			where: { id: existingItem.id },
			data: { quantity: existingItem.quantity + quantity },
		});
	} else {
		await prisma.cartItem.create({
			data: {
				cartId: cart.id,
				bookId,
				quantity,
			},
		});
	}

	return await getOrCreateCart(userId);
};

const updateCartItemQuantity = async (cartItemId: string, payload: IUpdateCartItemPayload) => {
	return await prisma.cartItem.update({
		where: { id: cartItemId },
		data: { quantity: payload.quantity },
	});
};

const removeFromCart = async (cartItemId: string) => {
	return await prisma.cartItem.delete({
		where: { id: cartItemId },
	});
};

// 5. Clear Entire Cart
const clearCart = async (userId: string) => {
	const cart = await prisma.cart.findUnique({ where: { userId } });
	if (cart) {
		await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
	}
	return { message: "Cart cleared successfully" };
};

export const CartService = {
	getOrCreateCart,
	addToCart,
	updateCartItemQuantity,
	removeFromCart,
	clearCart,
};