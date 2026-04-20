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
      success: true,
      message: "Usuario registrado correctamente",
      data: { user },
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
      success: true,
      message: "Login correcto",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
