const express = require("express");
const { createResume } = require("../Controllers/ResumeController");
const mongoose = require("mongoose");
const { ensureConnection } = require("../Models/db");
const Resume = require("../Models/resume");

const router = express.Router();

// 🔹 Resume Create Route - AI-generated from JSON data
router.post("/create", createResume);

router.delete("/delete/:id", async (req, res) => {
    try {
        const { bucket } = await ensureConnection();
        const resumeId = req.params.id;

        const resume = await Resume.findById(resumeId);
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        // Delete from GridFS
        if (resume.fileId) {
            await bucket.delete(new mongoose.Types.ObjectId(resume.fileId));
        }

        // Delete from MongoDB
        await Resume.findByIdAndDelete(resumeId);

        res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).json({ message: "Error deleting resume" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const { userId } = req.query; // Assuming userId is sent as a query parameter
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ resumes });
        console.log("done!!")
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// The download route is handled in server.js

module.exports = router;