import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory
import EditProfile from "../components/editProfile.jsx"; // Import the EditProfile component

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //State to control the edit modal
  const navigate = useNavigate(); //Initialize useHistory

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://anonymouspostl.onrender.com/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again."); // Notify user
          navigate("/login"); // Redirect to login page
        } else {
          setError("Error fetching user data.");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Open the edit modal
  };

  const handleCloseModal = () => {
    setIsEditing(false); // Close the edit modal
  };

  const handleSave = (updatedUserData) => {
    setUserData(updatedUserData); // Update state with new user data
    handleCloseModal(); // Close the modal after saving
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My Dashboard</h1>
          <div>
            <Link to="/home" className="text-gray-600 hover:text-blue-500 mx-2">
              Home
            </Link>
            <Link
              to="/posts"
              className="text-gray-600 hover:text-blue-500 mx-2"
            >
              Posts
            </Link>
            <Link
              to="/photos"
              className="text-gray-600 hover:text-blue-500 mx-2"
            >
              Photos
            </Link>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : userData ? (
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              {userData.profilePhoto && (
                <img
                  src={`http://localhost:3001/uploads/profilePhotos/${userData.profilePhoto}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-600"
                />
              )}
              <h1 className="text-2xl font-semibold mt-4">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.mobile}</p>
              <button
                onClick={handleEditClick}
                className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <EditProfile
          userData={userData}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Profile;
