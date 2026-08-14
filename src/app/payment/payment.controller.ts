import type { Request, Response } from "express";
import httpStatus from "http-status";

import { PaymentService } from "./payment.service";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import config from "../config";

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
	const { orderId } = req.body;
	const result = await PaymentService.initiatePayment(orderId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Payment session initiated successfully",
		data: result,
	});
});

const handleSuccessCallback = catchAsync(async (req: Request, res: Response) => {
	const orderId = (req.query.orderId as string) || req.body.value_a;
	const tranId = (req.body.tran_id as string) || (req.query.tran_id as string);

	await PaymentService.handlePaymentSuccess(orderId, tranId);

	// Redirect to Frontend Success Screen
	res.redirect(`${config.frontend_url}/checkout/success?orderId=${orderId}`);
});

const handleFailCallback = catchAsync(async (req: Request, res: Response) => {
	const orderId = (req.query.orderId as string) || req.body.value_a;
	await PaymentService.handlePaymentFailed(orderId);

	// Redirect to Frontend Fail Screen
	res.redirect(`${config.frontend_url}/checkout/failed?orderId=${orderId}`);
});

export const PaymentController = {
	initiatePayment,
	handleSuccessCallback,
	handleFailCallback,
};