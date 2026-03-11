import User from "../models/user.model.js";

export const getProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
