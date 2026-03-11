import { sendVerificationCode } from "../middlewares/email.js";
import User from "../models/user.model.js";

export const userSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await User.create({ name, email, password, verificationCode });

    await user.save();
    sendVerificationCode(user.email, verificationCode);

    const token = user.generateAuthToken();
    res.cookie("token", token);

    // await sendVerificationEmail(email, token);

    res.status(201).json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
      token,
    });

    return (user, token);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const verificationController = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Verification code is required" });
    }
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

    return (user, token);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const userLogoutController = async (req, res) => {
  try {
    let { userId } = req.body;
    if (!userId)
      return res.status(404).json({
        messege: "UserId required",
      });
    let user = await UserModel.findById(userId);
    if (!user)
      return res.status(404).json({
        messege: "User not found ! Unauthorized",
      });

    await user.res.clearCookie("token");

    res.status(201).json({
      messege: "User LoggedOut",
      user: user,
    });
  } catch (error) {
    return res.status(401).json({
      messege: "Unauthorized access",
    });
  }
};
