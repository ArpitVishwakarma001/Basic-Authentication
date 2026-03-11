import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies.token;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      meassage: "Access denied. No token provided",
    });
  }
  const token = authHeader.split(" ")[1] || authHeader; // Handle both "Bearer token" and cookie token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
