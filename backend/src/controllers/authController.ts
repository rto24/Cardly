import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const accessToken = generateAccessToken(user.id); 
    const refreshToken = generateRefreshToken(user.id); 

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token required" });
    return;
  }

  try {
    const decoded = verifyToken(refreshToken);

    if (typeof decoded === "string" || !("id" in decoded)) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    const userId = parseInt(decoded.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    const newAccessToken = generateAccessToken(user.id); 
    const newRefreshToken = generateRefreshToken(user.id); 

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token", error });
  }
};