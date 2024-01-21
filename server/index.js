import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => {
		console.log("Connected to MongoDB!");
	})
	.catch(err => {
		console.log(err);
	});

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// error middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error!";
	res.status(statusCode).json({
		success: false,
		statusCode,
		message
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000!");
});
