import React, { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "../components/postForm";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  // Function to fetch all posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data); // Update state with fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <PostForm />
      <div className="max-w-3xl mx-auto my-6">
        <div className="mt-6 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">{post.content}</p>
                <p className="text-gray-500 text-sm">
                  Posted by {post.userId.name} on{" "}
                  {new Date(post.createdAt).toLocaleString()}{" "}
                  {/* Adjust based on your post structure */}
                </p>
              </div>
            ))
          ) : (
            <p>No posts available.</p> // Message if there are no posts
          )}
        </div>
      </div>
    </>
  );
};

export default PostFeed;
