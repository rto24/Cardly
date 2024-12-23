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
    res.status(500).json({ message: "Error getting user posts:", error});
  }
};

export const getPostLikes = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  try {
    const numericPostId = +postId;
    const likesOnPost = await prisma.like.findMany({ where: { postId: numericPostId }});

    res.status(200).json(likesOnPost);
  } catch (error) {
    res.status(500).json({ message: "Error getting likes on post:", error});
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  try {
    const numericPostId = +postId;
    const commentsOnPost = await prisma.comment.findMany({ where: { postId: numericPostId }});

    res.status(200).json(commentsOnPost);
  } catch (error) {
    res.status(500).json({ message: "Error getting comments on post:", error});
  }
};

export const likePost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: Number(postId),
        userId: Number(userId),
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      
      res.status(200).json({ message: "Post unliked" });
      return;
    } else {
      const newLike = await prisma.like.create({
        data: {
          postId: Number(postId),
          userId: Number(userId)
        },
      });
      res.status(201).json(newLike);
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking post:", error});
  }
};

export const commentOnPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        userId: Number(userId),
      }
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment:", error});
  }
};