import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { env } from "../../config/env";

type RegisterInput = {
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const registerUser = async ({ email, password }: RegisterInput) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "USER",
  });

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};
