import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application, type Request, type Response } from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

// Module Routes Imports
import { AuthRoutes } from "./app/module/auth/auth.route";
import { AuthorRoutes } from "./app/module/author/author.route";
import { CategoryRoutes } from "./app/module/category/category.route";
import { PublisherRoutes } from "./app/module/publisher/publisher.route";

const app: Application = express();

// Enable CORS
app.use(
	cors({
		origin: config.frontend_url,
		credentials: true,
	}),
);

// Body Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Application Module Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/authors", AuthorRoutes);
app.use("/api/v1/publishers", PublisherRoutes);
app.use("/api/v1/categories", CategoryRoutes);

// Root Welcome Route
app.get("/", async (req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		message: "Welcome to BoiMohol E-Commerce Backend API Server",
	});
});

// Global Error Handler & 404 Route
app.use(globalErrorHandler);
app.use(notFound);

export default app;