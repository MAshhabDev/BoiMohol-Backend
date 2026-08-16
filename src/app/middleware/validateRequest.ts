import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (zodSchema: ZodSchema) => {
	return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
		const payload = req.body ?? {};
		const result = zodSchema.safeParse(payload);

		if (!result.success) {
			console.log(result.error);
			console.log(result.error.issues);

			const message = result.error.issues[0]?.message || "Validation Error";
			throw new Error(message);
		}

		req.body = result.data;
		next();
	});
};