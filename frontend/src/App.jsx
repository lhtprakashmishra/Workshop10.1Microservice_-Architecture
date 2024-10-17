import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import Register from "./components/register";
import Login from "./components/login"; // Assuming you have a login component
import Profile from "./components/profile";
import "./App.css";
import PostFeed from "./components/postFeed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />{" "}
        {/* Route for registration page */}
        <Route path="/login" element={<Login />} /> {/* Route for login page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<PostFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
