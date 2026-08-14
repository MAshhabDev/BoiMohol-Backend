import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { auth } from "../middleware/checkAuth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

// Initiate Payment (Protected)
router.post(
	"/initiate",
	auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN),
	PaymentController.initiatePayment,
);

// Payment Gateway Callback Webhooks (Public)
router.post("/success", PaymentController.handleSuccessCallback);
router.get("/success", PaymentController.handleSuccessCallback);
router.post("/fail", PaymentController.handleFailCallback);
router.get("/fail", PaymentController.handleFailCallback);

export const PaymentRoutes = router;