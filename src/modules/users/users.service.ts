import mongoose from "mongoose";
import { User, UserRole } from "./user.model";
import { HttpError } from "../../utils/httpError";

export const getAllUsers = async () => {
  return User.find().select("-password").sort({ createdAt: -1 });
};

export const getUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpError("ID de usuario inválido", 400);
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new HttpError("Usuario no encontrado", 404);
  }

  return user;
};

export const updateUserRole = async (id: string, role: UserRole) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpError("ID de usuario inválido", 400);
  }

  if (!["USER", "ADMIN"].includes(role)) {
    throw new HttpError("Rol inválido", 400);
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new HttpError("Usuario no encontrado", 404);
  }

  return user;
};

export const deleteUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpError("ID de usuario inválido", 400);
  }

  const user = await User.findByIdAndDelete(id).select("-password");

  if (!user) {
    throw new HttpError("Usuario no encontrado", 404);
  }

  return user;
};
