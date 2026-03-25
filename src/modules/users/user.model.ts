import { Schema, model, Document } from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("User", userSchema);
