import express from "express";
import {
  register,
  login,
  editUser,
} from "../user-profile/Controller/RegistrationController/registrationController.js";
import { validationRules, verifyToken } from "../auth/authenticaltion.js";
import { getProfile } from "../user-profile/Controller/ProfileController/profileController.js";

import multer from "multer";
import path from "path";
import {
  createPost,
  getUserPosts,
} from "../user-post/Controller/PostController/postController.js";

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(process.cwd(), "uploads/profilePhotos");
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("testServer Detected");
  res.status(200).send("Test server detected");
});

// Register route with multer middleware for profile photo
router.post(
  "/register",
  upload.single("profilePhoto"),
  validationRules(),
  register
);
router.post("/login", login);

router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, upload.single("profilePhoto"), editUser);

router.post("/posts", verifyToken, createPost);

router.get("/posts", getUserPosts);

export default router;
