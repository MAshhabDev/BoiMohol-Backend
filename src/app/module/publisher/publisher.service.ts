import { prisma } from "../../lib/prisma";

const createPublisher = async (payload: { name: string; logoUrl?: string }) => {
	const slug = payload.name.trim().toLowerCase().replace(/\s+/g, "-");
	return await prisma.publisher.create({
		data: { name: payload.name, slug, logoUrl: payload.logoUrl },
	});
};

const getAllPublishers = async () => {
	return await prisma.publisher.findMany({ orderBy: { createdAt: "desc" } });
};

const deletePublisher = async (id: string) => {
	return await prisma.publisher.delete({ where: { id } });
};

export const PublisherService = { createPublisher, getAllPublishers, deletePublisher };