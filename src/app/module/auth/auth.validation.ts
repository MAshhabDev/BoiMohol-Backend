import z from "zod";

// User Registration Validation
const UserRegistrationZodSchema = z.object({
	name: z
		.string({ message: "Name is required" })
		.min(3, "Name must be at least 3 characters long"),
	email: z
		.string({ message: "Email is required" })
		.email("Invalid email address"),
	password: z
		.string({ message: "Password is required" })
		.min(8, "Password must be minimum 8 characters long")
		.regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
		.regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
		.regex(/[0-9]/, "Password must contain at least 1 number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
	phone: z.string().optional(),
});

// User Login Validation
const LoginZodSchema = z.object({
	email: z
		.string({ message: "Email is required" })
		.email("Invalid email address"),
	password: z
		.string({ message: "Password is required" })
		.min(8, "Password must be minimum 8 characters long"),
});

export const UserValidation = {
	UserRegistrationZodSchema,
	LoginZodSchema,
};