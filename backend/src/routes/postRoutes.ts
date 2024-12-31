import express, { Request, Response } from "express";
import { createPost, getUserPosts, likePost, commentOnPost, getPostLikes, getComments } from "../controllers/postController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:userId", authenticateJWT, getUserPosts);
router.post("/create-post", authenticateJWT, createPost);
router.post("/:postId/like", authenticateJWT, likePost);
router.post("/:postId/comment", authenticateJWT, commentOnPost);
router.get("/:postId/like", authenticateJWT, getPostLikes);
router.get("/:postId/comment", authenticateJWT, getComments);

export default router;

