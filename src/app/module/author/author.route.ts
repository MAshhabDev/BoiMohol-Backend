import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthorController } from "./author.controller";

const router = Router();

router.get("/", AuthorController.getAllAuthors);
router.get("/:slug", AuthorController.getAuthorBySlug);
router.post("/", auth(Role.ADMIN, Role.SUPER_ADMIN), AuthorController.createAuthor);
router.patch("/:id", auth(Role.ADMIN, Role.SUPER_ADMIN), AuthorController.updateAuthor);
router.delete("/:id", auth(Role.ADMIN, Role.SUPER_ADMIN), AuthorController.deleteAuthor);

export const AuthorRoutes = router;