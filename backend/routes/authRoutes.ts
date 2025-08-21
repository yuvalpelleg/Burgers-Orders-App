import express from "express";

const router = express.Router();

// Public routes
router.post("/register");
router.post("/login");

//Private Routes

//router.use(authenticate); to protect all these routes

router.get("/profile");

export default router;
