import express, { Request, Response } from "express";
import { createPost, getUserPosts } from "../controllers/postController";

const router = express.Router();

router.get("/:userId", getUserPosts);
router.post("/create-post", createPost);

export default router;

