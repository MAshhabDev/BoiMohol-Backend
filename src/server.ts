import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";

const PORT = config.port || 5000;

const main = async () => {
	try {
		await prisma.$connect();
		console.log("Connected to PostgreSQL database successfully.");

		app.listen(PORT, () => {
			console.log(`BoiMohol Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error starting the server:", error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();