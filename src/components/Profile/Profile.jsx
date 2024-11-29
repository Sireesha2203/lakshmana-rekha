import React from 'react'
import { loginContext } from '../../contexts/loginContext';
import { useContext } from 'react';
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";
import axios from "axios";
function Profile() {
  let [currentUser, , userLoginStatus, , logoutUser,,,,checkTokenAndFetchUser] = useContext(loginContext);
  let navigate = useNavigate();
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editDetails, setEditDetails] = useState({
    _id: currentUser?._id,
    username: currentUser?.username,
    firstname: currentUser?.firstname,
    lastname: currentUser?.lastname,
    email: currentUser?.email,
    phone: currentUser?.phone,
  });
  useEffect(() => {
    if(!userLoginStatus){
      navigate("/SignInSignUp");
    }
    setEditDetails({
      _id: currentUser?._id,
      username: currentUser?.username,
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      email: currentUser?.email,
      phone: currentUser?.phone,
    });
  }, [currentUser]);

  const [editPassword, setEditPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleEditDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditDetailsSubmit = async () => {
    try{
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }
      const response=await axios.put("/user-api/update",editDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Simulate backend update (Replace with API integration)
      setIsEditingDetails(false);
      alert("Details updated successfully!");
      if (response.status === 200) {
        console.log(response.data.message);
        alert(response.data.message);
        if(currentUser.username !== editDetails.username){
          await checkTokenAndFetchUser();        
          alert("Please login again to see the changes");
          logoutUser();
          navigate("/SignInSignUp");
        }else{
          await checkTokenAndFetchUser();
        }
      } else if(response.status === 409){
        console.error('Error:', response.data.message);
        alert(response.data.message);
      } else {
        console.error('Error:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details. Please try again later.',error);
    }
  };
  const handleEditPasswordChange = (e) => {
    const { name, value } = e.target;
    setEditPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPasswordSubmit = async() => {
    if (editPassword.newPassword !== editPassword.confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    try{
      // Get the username from currentUser
      const username = currentUser.username;
      const response = await axios.put(
        `/user-api/change-password/${username}`,
        editPassword,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
        }
      );
      if(response.status !== 200){
        throw new Error(response.data.message || "An error occurred while updating the password. Please try again.");
      }
      // Handle success response
      alert(response.data.message || "Password updated successfully!");
      setEditPassword({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      setIsEditingPassword(false);
      alert("Password updated successfully!");
      logoutUser();
      navigate("/SignInSignUp");
    } catch (error) {
      console.error("Error updating password:", error);

      // Handle errors (validation or server issues)
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Display backend error message
      } else {
        alert("An error occurred while updating the password. Please try again.");
      }
    }    
  };
  const fadeOutSlideUpAnimation = useSpring({
    to: async (next) => {
      await next({ opacity: 1, transform: "translateY(-10px)" });
    },
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 700 },
  });

  return (
    <animated.div style={fadeOutSlideUpAnimation} className="fs-3 text-white container p-4 m-1">
      {userLoginStatus && currentUser ? (
        <div className='m-4 p-1'>
          <h1>Welcome!!! {currentUser?.username }</h1>
          <div className="profile-pic-container mb-3">
            {currentUser?.profilePic ? (
              <img
                src={currentUser.profilePic}
                alt="Profile"
                className="profile-pic"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ccc",
                }}
              />
            ) : (
              <div className="no-profile text-muted">
                <p>No Profile Picture</p>
              </div>
            )}
          </div>
          {!isEditingDetails ? (
            <div className="user-details">
              <p>
                <strong>First Name:</strong> {currentUser.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {currentUser.lastname}
              </p>
              <p>
                <strong>Phone:</strong> {currentUser.phone}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <Button variant="primary" onClick={() => setIsEditingDetails(true)}>
                Edit Details
              </Button>
            </div>
          ) : (
            <div className="edit-details">
              <h3>Edit Details</h3>
              {["username", "firstname", "lastname", "email", "phone"].map((field) => (
                <div key={field} className="mb-3">
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={editDetails[field]}
                    onChange={handleEditDetailsChange}
                    className="form-control"
                  />
                </div>
              ))}
              <Button variant="success" onClick={handleEditDetailsSubmit}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary" onClick={() => setIsEditingDetails(false)}>
                Cancel
              </Button>
            </div>
          )}

          {/* Change Password */}
          {!isEditingPassword ? (
            <div className="mt-4">
              <Button
                variant="warning"
                onClick={() => setIsEditingPassword(true)}
              >
                Change Password
              </Button>
            </div>
          ) : (
            <div className="edit-password mt-4">
              <h3>Change Password</h3>
              <div className="mb-3">
                <label>Old Password:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={editPassword.oldPassword}
                  onChange={handleEditPasswordChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={editPassword.newPassword}
                  onChange={handleEditPasswordChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={editPassword.confirmNewPassword}
                  onChange={handleEditPasswordChange}
                  className="form-control"
                />
              </div>
              <Button variant="success" onClick={handleEditPasswordSubmit}>
                Update Password
              </Button>{" "}
              <Button variant="secondary" onClick={() => setIsEditingPassword(false)}>
                Cancel
              </Button>
            </div>
          )}
          <Button variant="danger" onClick={logoutUser}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="container col-sm-10 col-lg-6 p-5 mt-5 border border-5 bg-secondary bg-opacity-10">
          <h1 className="display-1 text-danger">You are Logged Out</h1>
          <p className="display-6">Please Login to continue</p>
          <NavLink
              className="fw-bold fs-4 text-decoration-none text-white p-2"
              to="/SignInSignUp"
            >
            <Button variant="primary">
              Login
            </Button>
          </NavLink>
        </div>
      )}
    </animated.div>
  );
}

export default Profile;