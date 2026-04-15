import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = registerSchema.parse(req.body);

    const user = await registerUser(parsed);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = loginSchema.parse(req.body);

    const result = await loginUser(parsed);

    res.status(200).json({
      message: "Login correcto",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
