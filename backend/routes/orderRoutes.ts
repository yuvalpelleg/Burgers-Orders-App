import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticate, createOrder);

router.get("/", authenticate, getOrders);

export default router;
