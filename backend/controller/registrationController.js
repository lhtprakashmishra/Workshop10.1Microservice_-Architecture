import User from "../model/registrationModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// Register function with profile photo handling
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log("Received registration request:", req.body);
    if (req.file) {
      console.log("Uploaded file path:", req.file.path);
    } else {
      console.log("No file uploaded");
    }

    const { name, email, mobile, password } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    const registered = await User.findOne({ email });
    if (!registered) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        mobile,
        password: hashedPassword,
        profilePhoto: req.file.filename,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User Registered Successfully", token });
    } else {
      res.status(400).json({ message: "User Already Registered" });
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate a token with user ID
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const editUser = async (req, res) => {
  const { name, email, mobile } = req.body;
  const userId = req.user.id;
  console.log(userId); // Assuming you're using middleware to get the user ID

  try {
    // Prepare the update data
    const updateData = { name, email, mobile };

    // Check if a file was uploaded
    if (req.file) {
      // Store the filename to update
      updateData.profilePhoto = req.file.filename; // Save only the filename
    }

    // Update the user in the database (e.g., using Mongoose)
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    // Send back the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating profile." });
  }
};
