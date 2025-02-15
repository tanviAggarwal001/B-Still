// HomeContent.js
import React from "react";
import "./HomeContent.css"; // Move the styles here if needed
import resumeLogo from '../assets/resumeLogo.svg';
import Analyse from "../assets/Analyse.svg"
import Edit from "../assets/Edit.svg"


function HomeContent({ setActiveTab }) {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h2>Build Your Perfect ATS-Optimized Resume</h2>
        <p>
          Get past automated screening systems and land your dream job with our
          powerful resume builder.
        </p>
        <button onClick={() => setActiveTab("Create")} style={{ padding: "10px 20px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Create Your Resume</button>
      
    
      </div>

      {/* Features Section */}
      <h1>Why Choose Us?</h1>
      <div className="features-section">
        <div className="feature-box">
        <img src={resumeLogo} style={{width: 40}} alt="Resume Icon" />
          <h3>ATS-Optimized Resumes</h3>
          <p>
            Our AI-powered tool ensures your resume is formatted to pass through
            applicant tracking systems.
          </p>
        </div>
        <div className="feature-box">
        <img src={Edit} style={{width: 40}} alt="Edit Icon" />

          <h3>Easy Editing</h3>
          <p>
            Modify your resume anytime with our user-friendly editor and built-in
            templates.
          </p>
        </div>
        <div className="feature-box">
        <img src={Analyse} style={{width: 40}} alt="Analyse Icon" />

          <h3>ATS Score Checker</h3>
          <p>
            Analyze your resume and receive an ATS score to improve your chances
            of getting hired.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h1>What Our Users Say</h1>
        <div className="testimonial-box">
          <p>
            "This resume builder helped me land my dream job! I was struggling
            with ATS rejections before, but now I get more interview calls."
          </p>
          <strong>— Sarah M.</strong>
        </div>
        <div className="testimonial-box">
          <p>
            "Easy to use and super effective. The ATS score checker helped me
            optimize my resume for better visibility."
          </p>
          <strong>— John D.</strong>
        </div>
      </div>

      {/* Call to Action */}
      <div className="hero-section" style={{ marginTop: "50px" }}>
        <h2>Start Building Your Resume Today!</h2>
        <p>Join thousands of job seekers who have improved their resumes with our platform.</p>
        <button onClick={() => setActiveTab("Create")} style={{ padding: "10px 20px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Get Started</button>
      </div>
    </div>
  );
}

export default HomeContent;
