import express, { Request, Response } from "express";
import { createPost, getUserPosts, likePost, commentOnPost } from "../controllers/postController";

const router = express.Router();

router.get("/:userId", getUserPosts);
router.post("/:postId/like", likePost);
router.post("/:postId/comment", commentOnPost);
router.post("/create-post", createPost);

export default router;

