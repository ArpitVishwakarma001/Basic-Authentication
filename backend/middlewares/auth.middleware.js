import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      meassage: "Access denied. No token provided",
    });
  }

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
