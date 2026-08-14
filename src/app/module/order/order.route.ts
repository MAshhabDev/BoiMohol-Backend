import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { OrderController } from "./order.controller";

const router = Router();

// Customer Routes
router.post("/", auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN), OrderController.createOrder);
router.get("/me", auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN), OrderController.getMyOrders);
router.get("/:id", auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN), OrderController.getOrderById);

// Admin Management Routes
router.get("/", auth(Role.ADMIN, Role.SUPER_ADMIN), OrderController.getAllOrdersAdmin);
router.patch("/:id/status", auth(Role.ADMIN, Role.SUPER_ADMIN), OrderController.updateOrderStatusAdmin);

export const OrderRoutes = router;