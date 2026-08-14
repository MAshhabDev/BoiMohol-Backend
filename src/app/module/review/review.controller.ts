import type { Request, Response } from "express";
import httpStatus from "http-status";
import type { IRequestUser } from "../auth/auth.interface";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;
  const result = await ReviewService.createReview(user.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: result,
  });
});

const getBookReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getBookReviews(
    req.params.bookId as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const ReviewController = { createReview, getBookReviews };
