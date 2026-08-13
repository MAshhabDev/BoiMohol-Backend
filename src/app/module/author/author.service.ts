import { prisma } from "../../lib/prisma";

const createAuthor = async (payload: { name: string; bio?: string; photoUrl?: string }) => {
	const slug = payload.name.trim().toLowerCase().replace(/\s+/g, "-");
	
	return await prisma.author.create({
		data: {
			name: payload.name,
			slug,
			bio: payload.bio,
			photoUrl: payload.photoUrl,
		},
	});
};

const getAllAuthors = async () => {
	return await prisma.author.findMany({
		orderBy: { createdAt: "desc" },
	});
};

const getAuthorBySlug = async (slug: string) => {
	return await prisma.author.findUnique({
		where: { slug },
		include: { books: true },
	});
};

const updateAuthor = async (id: string, payload: any) => {
	let slug: string | undefined;
	if (payload.name) {
		slug = payload.name.trim().toLowerCase().replace(/\s+/g, "-");
	}

	return await prisma.author.update({
		where: { id },
		data: { ...payload, ...(slug && { slug }) },
	});
};

const deleteAuthor = async (id: string) => {
	return await prisma.author.delete({
		where: { id },
	});
};

export const AuthorService = {
	createAuthor,
	getAllAuthors,
	getAuthorBySlug,
	updateAuthor,
	deleteAuthor,
};