import { prisma } from "../../lib/prisma";

const createReview = async (userId: string, payload: { bookId: string; rating: number; comment?: string }) => {
	return await prisma.review.create({
		data: {
			userId,
			bookId: payload.bookId,
			rating: payload.rating,
			comment: payload.comment,
		},
	});
};

const getBookReviews = async (bookId: string) => {
	return await prisma.review.findMany({
		where: { bookId },
		include: { user: { select: { name: true } } },
		orderBy: { createdAt: "desc" },
	});
};

export const ReviewService = { createReview, getBookReviews };