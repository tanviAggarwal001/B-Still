// About.js
import React from "react";
import "./About.css"; // Move the styles here

function About({ setActiveTab }) {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our platform! We are dedicated to helping job seekers create{" "}
        <b>ATS (Applicant Tracking System) optimized resumes</b> that stand out in
        the competitive job market.
      </p>
      <img className="about-image" src="your-image-placeholder.jpg" alt="ATS Certified Resumes" />
      <h2>What is ATS and Why Does it Matter?</h2>
      <p>
        ATS stands for Applicant Tracking System. It is software used by companies
        to filter and rank resumes before they are seen by human recruiters...
      </p>
      <h2>Our Mission</h2>
      <div className="mission-statement">
        <h2>Empowering Job Seekers with ATS-Optimized Resumes</h2>
        <p>
          We believe that every job seeker deserves a fair chance to be seen by
          employers...
        </p>
      </div>
      <h2>Why Choose Us?</h2>
      <p>
        We understand how difficult it can be to create a resume that stands out
        and is ATS-compliant...
      </p>
      <div className="stats-container">
        <div className="stat-box">
          <h3>10,000+</h3>
          <p>Resumes Created</p>
        </div>
        <div className="stat-box">
          <h3>95%</h3>
          <p>ATS Success Rate</p>
        </div>
        <div className="stat-box">
          <h3>500+</h3>
          <p>Happy Job Seekers</p>
        </div>
      </div>
      <h2>Our Vision</h2>
      <p>
        Our vision is to revolutionize the job application process by empowering
        job seekers...
      </p>
      {/* <h2>Get Started</h2>
      <p>
        Ready to create an ATS-friendly resume?{" "}
        <button 
          type = "button"
          onClick={() => setActiveTab("Create")} 
          className="small-rounded"
        >
          Get Started
        </button>
        and let us help you on your journey to success!
      </p> */}
    </div>
  );
}

export default About;
