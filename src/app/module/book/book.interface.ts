import type { BindingType } from "../../../generated/prisma/enums";

export interface ICreateBookPayload {
	title: string;
	description?: string;
	coverImage?: string;
	samplePdfUrl?: string;
	authorId: string;
	publisherId: string;
	categoryId: string;
	binding: BindingType;
	regularPrice: number;
	salePrice?: number;
	stock: number;
	isFeatured?: boolean;
}

export interface IUpdateBookPayload {
	title?: string;
	description?: string;
	coverImage?: string;
	samplePdfUrl?: string;
	authorId?: string;
	publisherId?: string;
	categoryId?: string;
	binding?: BindingType;
	regularPrice?: number;
	salePrice?: number;
	stock?: number;
	isFeatured?: boolean;
}

export interface IBookQueryFilters {
	searchTerm?: string;
	categoryId?: string;
	authorId?: string;
	publisherId?: string;
	isFeatured?: string;
}