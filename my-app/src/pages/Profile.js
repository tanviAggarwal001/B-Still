// Profile.js
import React from "react";
import "./Profile.css"; // Add the styles in a separate CSS file

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="default-user.png" alt="Profile Picture" />
        <h2>User Name</h2>
      </div>
      <div className="profile-section">
        <div className="profile-box">
          <label>Email:</label> user@example.com
        </div>
        <div className="profile-box">
          <label>Phone:</label> +1234567890
        </div>
        <div className="profile-box">
          <label>Address:</label> 123 Street, City
        </div>
        <div className="profile-box">
          <label>Date of Birth:</label> January 1, 1990
        </div>
      </div>
      <div className="separator"></div>
      <div className="profile-section">
        <div className="full-width-box">
          <label>
            <b>Occupation:</b>
          </label>{" "}
          Software Engineer
        </div>
        <div className="full-width-box">
          <label>
            <b>Achievements:</b>
          </label>{" "}
          Awarded Best Developer 2023
        </div>
        <div className="full-width-box">
          <label>
            <b>Experience:</b>
          </label>{" "}
          5+ Years in Web Development
        </div>
        <div className="full-width-box">
          <label>
            <b>Skills:</b>
          </label>{" "}
          HTML, CSS, JavaScript, React, Python
        </div>
      </div>
    </div>
  );
}

export default Profile;
