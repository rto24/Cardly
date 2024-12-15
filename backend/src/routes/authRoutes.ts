import express, { Response, Request } from "express";
import { registerUser, loginUser, refreshToken } from "../controllers/authController";
import { authenticateJWT } from "../middleware/authMiddleware";
import { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.get("/protected", authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: "Protected route accessed", user: req.user });
})

export default router;