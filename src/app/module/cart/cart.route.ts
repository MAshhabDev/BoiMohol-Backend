import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { CartController } from "./cart.controller";

const router = Router();

router.use(auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN));

router.get("/", CartController.getMyCart);
router.post("/", CartController.addToCart);
router.patch("/items/:id", CartController.updateCartItemQuantity);
router.delete("/items/:id", CartController.removeFromCart);
router.delete("/", CartController.clearCart);

export const CartRoutes = router;