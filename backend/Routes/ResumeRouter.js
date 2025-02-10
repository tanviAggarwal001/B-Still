// backend/Routes/ResumeRouter.js
const express = require("express");
const { createResume } = require("../Controllers/ResumeController");
const router = express.Router();

router.post("/create", createResume);

module.exports = router;