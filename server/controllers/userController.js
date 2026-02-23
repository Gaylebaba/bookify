import User from "../models/user.js";

/* ================= GET ALL USERS (ADMIN) ================= */

export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* ================= TOGGLE BLOCK USER ================= */

export const toggleBlockUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent admin from blocking themselves
    if (user.role === "admin") {
      return res.status(400).json({
        message: "Cannot block admin",
      });
    }

    user.blocked = !user.blocked;

    await user.save();

    res.status(200).json({
      message: "User status updated",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};