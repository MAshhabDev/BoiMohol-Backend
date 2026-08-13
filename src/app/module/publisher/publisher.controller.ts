import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PublisherService } from "./publisher.service";

const createPublisher = catchAsync(async (req: Request, res: Response) => {
	const result = await PublisherService.createPublisher(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Publisher created successfully",
		data: result,
	});
});

const getAllPublishers = catchAsync(async (req: Request, res: Response) => {
	const result = await PublisherService.getAllPublishers();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Publishers fetched successfully",
		data: result,
	});
});

const deletePublisher = catchAsync(async (req: Request, res: Response) => {
	const result = await PublisherService.deletePublisher(req.params.id as string);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Publisher deleted successfully",
		data: result,
	});
});

export const PublisherController = { createPublisher, getAllPublishers, deletePublisher };