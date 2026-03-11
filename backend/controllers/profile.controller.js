import User from "../models/user.model.js";

export const getProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
