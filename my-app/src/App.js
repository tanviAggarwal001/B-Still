import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components for each "page"
const Home = () => <h1>Welcome to the Home Page</h1>;
const About = () => <h1>About Us: We create awesome apps!</h1>;
const Profile = () => <h1>Your Profile Page</h1>;

function App() {
  return (
    <Router>
      {/* Navigation Menu */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
        <Link to="/profile" style={{ margin: "0 10px" }}>Profile</Link>
      </nav>

      {/* Routes to render pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
