import express, { Request, Response } from "express";
import { createPost, getUserPosts, likePost, commentOnPost, getPostLikes, getComments } from "../controllers/postController";

const router = express.Router();

router.get("/:userId", getUserPosts);
router.post("/create-post", createPost);
router.post("/:postId/like", likePost);
router.post("/:postId/comment", commentOnPost);
router.get("/:postId/like", getPostLikes);
router.get("/:postId/comment", getComments);

export default router;

