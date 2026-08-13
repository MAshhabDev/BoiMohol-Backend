import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { BookController } from "./book.controller";

const router = Router();

// Public Routes
router.get("/", BookController.getAllBooks);
router.get("/:slug", BookController.getBookBySlug);

// Admin Routes
router.post("/", auth(Role.ADMIN, Role.SUPER_ADMIN), BookController.createBook);
router.patch("/:id", auth(Role.ADMIN, Role.SUPER_ADMIN), BookController.updateBook);
router.delete("/:id", auth(Role.ADMIN, Role.SUPER_ADMIN), BookController.deleteBook);

export const BookRoutes = router;