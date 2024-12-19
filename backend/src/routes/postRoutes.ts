import express, { Request, Response } from "express";
import { createPost } from "../controllers/postController";

const router = express.Router();

router.post("/create-post", createPost)

export default router;

