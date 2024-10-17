// controllers/postController.js
import post from "../model/postModel.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id; // Get user ID from the token

  try {
    const newPost = await post.create({ userId, content });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post." });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Fetch all posts and populate the user data
    const posts = await post
      .find()
      .populate("userId", "name")
      .sort({ createdAt: -1 }); // Assuming `userId` is a reference field in your Post model that links to the User model
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts." });
  }
};
