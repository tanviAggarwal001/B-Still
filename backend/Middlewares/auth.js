const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        if (decoded.role !== "admin") return res.status(403).json({ success: false, message: "Forbidden" });

        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};



module.exports = adminAuth;
