import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthorService } from "./author.service";

const createAuthor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorService.createAuthor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Author created successfully",
    data: result,
  });
});

const getAllAuthors = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorService.getAllAuthors();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Authors fetched successfully",
    data: result,
  });
});

const getAuthorBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorService.getAuthorBySlug(req.params.slug as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author fetched successfully",
    data: result,
  });
});

const updateAuthor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorService.updateAuthor(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author updated successfully",
    data: result,
  });
});

const deleteAuthor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorService.deleteAuthor(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author deleted successfully",
    data: result,
  });
});

export const AuthorController = {
  createAuthor,
  getAllAuthors,
  getAuthorBySlug,
  updateAuthor,
  deleteAuthor,
};
