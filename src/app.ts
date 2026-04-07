import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { healthRouter } from "./routes/health";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.routes";
import usersRouter from "./modules/users/users.routes";
import { swaggerSpec } from "./config/swagger";

export const app = express();

/**
 * Global middlewares
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Swagger docs
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/api/v1/users", usersRouter);

/**
 * Error handling
 */
app.use(notFoundHandler);
app.use(errorHandler);
