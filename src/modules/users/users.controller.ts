import { Request, Response, NextFunction } from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUserById,
} from "./users.service";
import { UserRole } from "./user.model";

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

    res.status(200).json({
      message: "Usuarios obtenidos correctamente",
      users,
    });
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
    const user = await getUserById(req.params.id);

    res.status(200).json({
      message: "Usuario obtenido correctamente",
      user,
    });
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
    const { role } = req.body;

    const user = await updateUserRole(req.params.id, role);

    res.status(200).json({
      message: "Rol actualizado correctamente",
      user,
    });
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
    const user = await deleteUserById(req.params.id);

    res.status(200).json({
      message: "Usuario eliminado correctamente",
      user,
    });
  } catch (error) {
    next(error);
  }
};
