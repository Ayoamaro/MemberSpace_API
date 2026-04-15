import { z } from "zod";
import mongoose from "mongoose";

export const userIdParamSchema = z.object({
  id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "ID de usuario inválido",
  }),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});
