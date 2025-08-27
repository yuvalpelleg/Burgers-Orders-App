import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getOrders);

export default router;
