import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import { sendSuccess } from "../../utils/apiResponse";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = registerSchema.parse(req.body);

    const user = await registerUser(parsed);

    return sendSuccess(res, 201, "Usuario registrado correctamente", { user });
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

    return sendSuccess(res, 200, "Login correcto", result);
  } catch (error) {
    next(error);
  }
};
