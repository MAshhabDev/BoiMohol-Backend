import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { ReviewController } from "./review.controller";

const router = Router();

router.get("/:bookId", ReviewController.getBookReviews);
router.post("/", auth(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN), ReviewController.createReview);

export const ReviewRoutes = router;