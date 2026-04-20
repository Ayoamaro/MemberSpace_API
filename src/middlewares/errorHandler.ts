import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
