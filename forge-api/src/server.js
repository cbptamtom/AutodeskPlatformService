import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import { userRouter, bucketsRouter, filesRouter, modelsRouter } from "./routes/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";
//authentication middleware
dotenv.config();
const app = express();
// app.use(checkToken);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
const port = process.env.PORT ?? 4000;

if (!process.env.PORT) {
	console.error("PORT environment variable is not set.");
	process.exit(1);
}

// For better performance in HTTP responses
app.use(compression());

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
// Mount middleware functions at their respective paths
app.use("/api/users", userRouter);
app.use("/api/buckets", bucketsRouter);
app.use("/api/files", filesRouter);
app.use("/api/models", modelsRouter);

app.listen(port, async () => {
	await connect();
	console.log(`Listening on port: ${port}`);
});

// NEED TO USE express-validator FOR REQUEST VALIDATION AND DATA SANITIZATION
