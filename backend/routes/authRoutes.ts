import express from "express";
import {
  register,
  login,
  getProfile,
  logout,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authenticate, getProfile);

export default router;
