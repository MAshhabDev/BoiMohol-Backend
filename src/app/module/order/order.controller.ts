import type { Request, Response } from "express";
import httpStatus from "http-status";
import type { IRequestUser } from "../auth/auth.interface";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;
  const result = await OrderService.createOrder(user.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;
  const result = await OrderService.getMyOrders(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My orders fetched successfully",
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrderById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order details fetched successfully",
    data: result,
  });
});

const getAllOrdersAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersAdmin();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All orders fetched for admin",
    data: result,
  });
});

const updateOrderStatusAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.updateOrderStatusAdmin(
      req.params.id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  },
);

export const OrderController = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
};
