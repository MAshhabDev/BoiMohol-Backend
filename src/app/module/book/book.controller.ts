import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully with 12-Digit Barcode",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books fetched successfully",
    data: result,
  });
});

const getBookBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBookBySlug(req.params.slug as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book details fetched successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookBySlug,
  updateBook,
  deleteBook,
};
