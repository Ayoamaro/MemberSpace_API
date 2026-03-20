import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
}
