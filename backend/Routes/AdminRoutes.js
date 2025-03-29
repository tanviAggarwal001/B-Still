const express = require("express");
const adminAuth = require("../Middlewares/auth");
const Resume = require("../Models/resume");
const User = require("../Models/Users"); // Add this if missing

// const bcrypt = require("bcryptjs");

const router = express.Router();
const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

        req.adminId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Apply this middleware to protected routes
router.get("/resumes", async (req, res) => {
    const resumes = await Resume.find().populate("userId");
    res.json({ success: true, resumes });
});

module.exports = router;
