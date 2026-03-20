import { users, User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { randomUUID } from "crypto";

export async function register(email: string, password: string) {
  const existing = users.find((u) => u.email === email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const user: User = {
    id: randomUUID(),
    email,
    password: hashed,
    role: "user",
  };

  users.push(user);

  return user;
}

export async function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return { token };
}
