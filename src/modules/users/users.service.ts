import mongoose from "mongoose";
import { User, UserRole } from "./user.model";

export const getAllUsers = async () => {
  return User.find().select("-password").sort({ createdAt: -1 });
};

export const getUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de usuario inválido");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user;
};

export const updateUserRole = async (id: string, role: UserRole) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de usuario inválido");
  }

  if (!["USER", "ADMIN"].includes(role)) {
    throw new Error("Rol inválido");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user;
};

export const deleteUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de usuario inválido");
  }

  const user = await User.findByIdAndDelete(id).select("-password");

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user;
};
