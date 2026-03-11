import express from "express";
import { userLoginController, userSignupController, verificationController } from "../controllers/user.controller.js";

const router = express.Router();

// @route   GET /api
router.post("/signup", userSignupController )
router.post("/verify-email", verificationController )
router.post("/login", userLoginController )


export default router;

