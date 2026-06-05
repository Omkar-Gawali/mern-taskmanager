import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import limiter from "./middleware/rateLimiter.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

/*
==================================
Middlewares
==================================
*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(morgan("dev"));

app.use(limiter);

/*
==================================
Welcome Route
==================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    name: "Task Manager API",
    version: "1.0.0",
    status: "Running",
  });
});

/*
==================================
Routes
==================================
*/

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

/*
==================================
Error Middleware
==================================
*/

app.use(notFound);

app.use(errorHandler);

/*
==================================
Server
==================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
