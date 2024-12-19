import { Request, Response } from "express";
import prisma from "../prisma/prisma";

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content, imageUrl, userId } = req.body;
  if (!title || !content || !imageUrl || !userId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const newPost = await prisma.post.create({
      data: { title, content, imageUrl, userId },
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post:", error });
  }
};
