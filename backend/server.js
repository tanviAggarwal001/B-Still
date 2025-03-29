require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const myResumeRouters = require("./Routes/ResumeRouter");
// ✅ Import the proper MongoDB connection & GridFSBucket
const { conn, gfs, bucket, ensureConnection } = require("./Models/db"); 

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",  // ✅ Allow frontend
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// ✅ Ensure X-Frame-Options is disabled for embedding PDFs
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL"); 
    next();
});

app.use(express.json());

// Routes
const myAuthRouters = require("./Routes/AuthRouter");
// const myResumeRouters = require("./Routes/ResumeRouter");

app.use("/auth", myAuthRouters);
app.use("/resume", myResumeRouters);

// ✅ Serve PDFs directly from GridFSBucket
app.get("/resume/download/:id", async (req, res) => {
    try {
        const { bucket } = await ensureConnection(); // ✅ Ensure connection before using bucket

        if (!bucket) {
            return res.status(500).json({ message: "Database connection failed. Try again later." });
        }

        const fileId = new mongoose.Types.ObjectId(req.params.id);
        
        // Check if file exists first in the resumes.files collection
        const db = conn.db;
        const filesCollection = db.collection("resumes.files");
        const file = await filesCollection.findOne({ _id: fileId });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Set content type and filename for download
        res.set("Content-Type", "application/pdf");
        res.set("Content-Disposition", `inline; filename="${file.filename}"`);
        
        // Stream the file to the response
        const downloadStream = bucket.openDownloadStream(fileId);
        downloadStream.pipe(res);
        
        downloadStream.on("error", function(error) {
            res.status(500).json({ message: "Error streaming file", error: error.message });
        });
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ message: "Error retrieving resume", error: error.message });
    }
});




// Test Route
app.get("/", (req, res) => {
    res.send("🚀 API is working with MongoDB Atlas & GridFSBucket!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});