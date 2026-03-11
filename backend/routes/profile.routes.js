import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getProfileController } from "../controllers/profile.controller.js";

const router = express.Router();

// @route   GET /api/profile
router.get("/profile", authenticate, getProfileController);


export default router;