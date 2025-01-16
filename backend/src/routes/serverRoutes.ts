import express from "express";
import { createServer } from "../controllers/serverController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-server", authenticateJWT, createServer); 

export default router;