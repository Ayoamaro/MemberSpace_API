import { Request, Response, NextFunction } from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUserById,
} from "./users.service";
import { UserRole } from "./user.model";
import { userIdParamSchema, updateUserRoleSchema } from "./users.schema";
import { sendSuccess } from "../../utils/apiResponse";

type UserParams = {
  id: string;
};

type UpdateRoleBody = {
  role: UserRole;
};

export const getUsersController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();

    return sendSuccess(res, 200, "Usuarios obtenidos correctamente", { users });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = userIdParamSchema.parse(req.params);

    const user = await getUserById(id);

    return sendSuccess(res, 200, "Usuario obtenido correctamente", { user });
  } catch (error) {
    next(error);
  }
};

export const updateUserRoleController = async (
  req: Request<UserParams, {}, UpdateRoleBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = userIdParamSchema.parse(req.params);
    const { role } = updateUserRoleSchema.parse(req.body);

    const user = await updateUserRole(id, role);

    return sendSuccess(res, 200, "Rol actualizado correctamente", { user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = userIdParamSchema.parse(req.params);

    const user = await deleteUserById(id);

    return sendSuccess(res, 200, "Usuario eliminado correctamente", { user });
  } catch (error) {
    next(error);
  }
};
