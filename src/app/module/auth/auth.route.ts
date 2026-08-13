import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";

const router = Router();

// Customer / User Registration
router.post(
	"/register",
	validateRequest(UserValidation.UserRegistrationZodSchema),
	AuthController.registerUser,
);

// User Login (Email & Password)
router.post(
	"/login",
	validateRequest(UserValidation.LoginZodSchema),
	AuthController.loginUser,
);

// Get Current User Profile (Me)
router.get(
	"/me",
	auth(Role.ADMIN, Role.SUPER_ADMIN, Role.CUSTOMER),
	AuthController.getMe,
);

// Refresh Access Token
router.post(
	"/refresh-token",
	AuthController.refreshToken,
);

// Google Social Login
router.post(
	"/google",
	AuthController.googleLogin,
);



export const AuthRoutes = router;