import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await registerUser({ email, password });

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
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.status(200).json({
      message: "Login correcto",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
