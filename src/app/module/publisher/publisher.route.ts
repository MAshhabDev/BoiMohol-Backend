import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { PublisherController } from "./publisher.controller";

const router = Router();

router.get("/", PublisherController.getAllPublishers);
router.post("/", auth(Role.ADMIN, Role.SUPER_ADMIN), PublisherController.createPublisher);
router.delete("/:id", auth(Role.ADMIN, Role.SUPER_ADMIN), PublisherController.deletePublisher);

export const PublisherRoutes = router;