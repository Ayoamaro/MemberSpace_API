import express from "express";
import cors from "cors";
import helmet from "helmet";

import { healthRouter } from "./routes/health";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./modules/auth/auth.routes";

export const app = express();

/**
 * Global middlewares
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Root endpoint (API info)
 */
app.get("/", (_req, res) => {
  res.json({
    name: "MemberSpace API",
    version: "1.0.0",
    status: "running",
    docs: "/docs",
  });
});

/**
 * API v1 routes
 */
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);

/**
 * Error handling
 */
app.use(notFoundHandler);
app.use(errorHandler);
