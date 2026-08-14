import type { Request, Response } from "express";
import httpStatus from "http-status";
import type { IRequestUser } from "../auth/auth.interface";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CartService } from "./cart.service";

const getMyCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;
  const result = await CartService.getOrCreateCart(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart fetched successfully",
    data: result,
  });
});

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;
  const result = await CartService.addToCart(user.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to cart successfully",
    data: result,
  });
});

const updateCartItemQuantity = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartService.updateCartItemQuantity(
      req.params.id as string,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart item quantity updated",
      data: result,
    });
  },
);

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.removeFromCart(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item removed from cart",
    data: result,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;
  const result = await CartService.clearCart(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart cleared",
    data: result,
  });
});

export const CartController = {
  getMyCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
};
