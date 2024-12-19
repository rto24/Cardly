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

export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const numericId = +userId;
    const userPosts = await prisma.post.findMany({ where: { userId: numericId } });

    res.status(200).json(userPosts);
  } catch (error) { 
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Error getting user posts:", error});
  }
};