import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type JwtPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
};

export const signToken = (payload: JwtPayload) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido");
  }

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido");
  }

  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
