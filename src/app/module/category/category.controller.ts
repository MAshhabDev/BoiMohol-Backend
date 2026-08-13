import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryService.createCategory(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Category created successfully",
		data: result,
	});
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryService.getAllCategories();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Categories fetched successfully",
		data: result,
	});
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
	const result = await CategoryService.deleteCategory(req.params.id as string);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Category deleted successfully",
		data: result,
	});
});

export const CategoryController = { createCategory, getAllCategories, deleteCategory };