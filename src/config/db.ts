import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI no está definida en .env");
  }

  await mongoose.connect(env.MONGODB_URI);
  console.log("✅ MongoDB conectada");
};
