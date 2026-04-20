import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { HttpError } from "../utils/httpError";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HttpError("Token no proporcionado", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new HttpError("Formato de token inválido", 401);
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    }

    return next(new HttpError("Token inválido o expirado", 401));
  }
};
