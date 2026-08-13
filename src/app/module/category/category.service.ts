import { prisma } from "../../lib/prisma";

const createCategory = async (payload: { name: string; categoryPrefix: string }) => {
	const slug = payload.name.trim().toLowerCase().replace(/\s+/g, "-");
	return await prisma.category.create({
		data: {
			name: payload.name,
			slug,
			categoryPrefix: payload.categoryPrefix, // SRS 2-Digit Prefix
		},
	});
};

const getAllCategories = async () => {
	return await prisma.category.findMany({ orderBy: { createdAt: "desc" } });
};

const deleteCategory = async (id: string) => {
	return await prisma.category.delete({ where: { id } });
};

export const CategoryService = { createCategory, getAllCategories, deleteCategory };