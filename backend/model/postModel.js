// models/PostModel.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
