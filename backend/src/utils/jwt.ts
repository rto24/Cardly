import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables.");
};

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId.toString() }, JWT_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId.toString() }, JWT_SECRET, { expiresIn: "7d"});
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};