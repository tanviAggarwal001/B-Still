import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./LoginPage.css"; 
import logo from "../assets/b still logo png.png";
import googleSignIn from "../assets/sign in with google.png";
import { handleError, handleSuccess } from "../utils";

const SignupPage = () => {
  const [signInfo, setSignInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const { name, email, password } = signInfo;

    if (!name || !email || !password) {
      return handleError("Fields are empty");
    }

    try {
      const url = "https://b-still-backend.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/home"), 1000);
      } else if (error && error.details) {
        handleError(error.details[0]?.message || "An error occurred");
      } else {
        handleError(message || "Signup failed");
      }
    } catch (err) {
      handleError("Network error. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="B STILL Logo" />
      </div>
      <div className="login-box">
        <h2>Writing Standout Resumes!</h2>
        <form onSubmit={handleSubmission}>
          <label htmlFor="name">NAME</label>
          <input onChange={handleChange} type="text" name="name" id="name" placeholder="Enter your name" required />

          <label htmlFor="email">EMAIL</label>
          <input onChange={handleChange} type="email" name="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">PASSWORD</label>
          <input onChange={handleChange} type="password" name="password" id="password" placeholder="******" required />

          <button type="submit">Sign up</button>
        </form>
        <ToastContainer />
        <p>Already have an account? <Link to="/home">Login</Link></p>
        <p>OR</p>
        <div className="google-btn">
          <img src={googleSignIn} alt="Sign up with Google" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
