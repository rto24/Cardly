import express from "express";
import { createServer, getServers } from "../controllers/serverController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/available-servers", getServers);
router.post("/create-server", authenticateJWT, createServer); 

export default router;