const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/Admins");
const router = express.Router();

// Default Admin Creation Route
router.post("/create-default-admin", async (req, res) => {
    try {
        const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
        if (existingAdmin) {
            return res.status(400).json({ message: "Default admin already exists" });
        }

        // Securely hash the password
        const hashedPassword = await bcrypt.hash("admin123", 10); 

        const newAdmin = new Admin({
            email: "admin@example.com",
            password: hashedPassword, 
        });

        await newAdmin.save();
        res.json({ message: "Default admin created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error });
    }
});

// Admin Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("🔍 Checking email:", email);
        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log("❌ Admin not found!");
            return res.status(401).json({ success: false, message: "Admin not found" });
        }

        console.log("✅ Admin found:", admin);
        console.log("🔹 Entered Password:", password);
        console.log("🔹 Stored Hashed Password:", admin.password);
        const hashedPassword = await bcrypt.hash("admin123", 10);
        console.log("hashed" , hashedPassword);

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("🔹 Password Match Result:", isMatch);
        if (!isMatch) {
            console.log("❌ Password does not match!");
            console.log(password);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("✅ Token generated:", token);
        res.json({ success: true, token });
    } catch (error) {
        console.error("🚨 Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
