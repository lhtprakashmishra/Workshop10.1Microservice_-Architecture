import User from "../model/registrationModel.js"; // Assuming you have a User model
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you are storing user ID in the token
    console.log(userId);
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
