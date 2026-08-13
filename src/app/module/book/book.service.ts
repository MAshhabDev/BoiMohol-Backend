import type { BindingType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { IBookQueryFilters, ICreateBookPayload, IUpdateBookPayload } from "./book.interface";

const generateBarcodeAndSKU = async (categoryId: string, binding: BindingType) => {
	const category = await prisma.category.findUnique({
		where: { id: categoryId },
	});

	const categoryPrefix = category?.categoryPrefix || "10";
	const bindingCode = binding === "HARDCOVER" ? "0002" : "0001";
	const totalBooks = await prisma.book.count();
	const serial = String(totalBooks + 1).padStart(4, "0");
	const checkDigits = "05";

	const barcode = `${categoryPrefix}${bindingCode}${serial}${checkDigits}`;
	const sku = `BM-${categoryPrefix}-${serial}`;

	return { barcode, sku };
};

// Create Book
const createBook = async (payload: ICreateBookPayload) => {
	const slug = payload.title.trim().toLowerCase().replace(/\s+/g, "-");
	const { barcode, sku } = await generateBarcodeAndSKU(payload.categoryId, payload.binding);

	return await prisma.book.create({
		data: {
			title: payload.title,
			slug: `${slug}-${Date.now().toString().slice(-4)}`,
			description: payload.description,
			coverImage: payload.coverImage,
			samplePdfUrl: payload.samplePdfUrl,
			authorId: payload.authorId,
			publisherId: payload.publisherId,
			categoryId: payload.categoryId,
			binding: payload.binding,
			sku,
			barcode,
			regularPrice: payload.regularPrice,
			salePrice: payload.salePrice,
			stock: payload.stock,
			isFeatured: payload.isFeatured || false,
		},
		include: {
			author: true,
			publisher: true,
			category: true,
		},
	});
};

// Get All Books with Search & Filters
const getAllBooks = async (query: IBookQueryFilters) => {
	const { searchTerm, categoryId, authorId, publisherId, isFeatured } = query;
	const whereConditions: any = {};

	if (searchTerm) {
		whereConditions.OR = [
			{ title: { contains: searchTerm, mode: "insensitive" } },
			{ slug: { contains: searchTerm, mode: "insensitive" } },
		];
	}

	if (categoryId) whereConditions.categoryId = categoryId;
	if (authorId) whereConditions.authorId = authorId;
	if (publisherId) whereConditions.publisherId = publisherId;
	if (isFeatured === "true") whereConditions.isFeatured = true;

	return await prisma.book.findMany({
		where: whereConditions,
		include: {
			author: true,
			publisher: true,
			category: true,
		},
		orderBy: { createdAt: "desc" },
	});
};

// Get Book by Slug
const getBookBySlug = async (slug: string) => {
	const book = await prisma.book.findUnique({
		where: { slug },
		include: {
			author: true,
			publisher: true,
			category: true,
			reviews: {
				include: {
					user: {
						select: { name: true },
					},
				},
			},
		},
	});

	if (!book) {
		throw new Error("Book not found");
	}

	return book;
};

// Update Book
const updateBook = async (id: string, payload: IUpdateBookPayload) => {
	return await prisma.book.update({
		where: { id },
		data: payload,
	});
};

// Delete Book
const deleteBook = async (id: string) => {
	return await prisma.book.delete({
		where: { id },
	});
};

export const BookService = {
	createBook,
	getAllBooks,
	getBookBySlug,
	updateBook,
	deleteBook,
};