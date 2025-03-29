import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./LoginPage.css"; 
import logo from "../assets/b still logo png.png";
import googleSignIn from "../assets/sign in with google.png";
import { handleError, handleSuccess } from "../utils";

const LoginPage = () => {
  const [logInfo, setLogInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logInfo;

    if (!email || !password) {
      return handleError("Fields are empty");
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error , userId} = result;

      if (success) {
        handleSuccess(message);
        if (jwtToken) {
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("LogginUser", name);
          localStorage.setItem("userId", userId); // ✅ Store userId

          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          handleError("Login failed. No token received.");
        }
      } else if (error?.details) {
        handleError(error.details[0]?.message || "An error occurred");
      } else {
        handleError(message || "Login failed");
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
        <form onSubmit={handleLogin}>  {/* ✅ Corrected onSubmit placement */}
          <label htmlFor="email">EMAIL</label>
          <input onChange={handleChange} type="email" name="email" id="email" placeholder="Enter your email" required value={logInfo.email} />

          <label htmlFor="password">PASSWORD</label>
          <input onChange={handleChange} type="password" name="password" id="password" placeholder="******" required value={logInfo.password} />

          <button type="submit">Login</button>  {/* ✅ No `onSubmit` on button */}
        </form>
        <ToastContainer />
        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        <p>OR</p>
        <div className="google-btn">
          <img src={googleSignIn} alt="Sign up with Google" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
