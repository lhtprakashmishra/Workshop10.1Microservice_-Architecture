import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://anonymouspostl.onrender.com/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent(""); // Clear the textarea after submission
      onPostCreated(); // Notify parent to fetch posts again
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="What's on your mind?"
          className="w-full h-32 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Post
        </button>
      </form>
      <p className="text-gray-500 text-sm mt-2">
        Share your thoughts with everyone!
      </p>
    </div>
  );
};

export default PostForm;
