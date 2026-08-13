import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.post("/", auth(Role.ADMIN, Role.SUPER_ADMIN), CategoryController.createCategory);
router.delete("/:id", auth(Role.ADMIN, Role.SUPER_ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;