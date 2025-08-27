import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productcontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getProducts);

router.post("/", authMiddleware, addProduct);

export default router;
