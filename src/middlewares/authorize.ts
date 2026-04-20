import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";

type Role = "USER" | "ADMIN";

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpError("No autenticado", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new HttpError("No tienes permisos para acceder a este recurso", 403),
      );
    }

    next();
  };
};
