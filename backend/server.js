require("dotenv").config();
const express = require("express");
require("./Models/db"); // ✅ Ensures MongoDB connection
require("./Models/Users"); // ✅ Ensures User model is loaded
const cors = require("cors");

const myAuthRouters = require("./Routes/AuthRouter");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Use instead of bodyParser.json()
app.use("/auth", myAuthRouters);

// Test Route
app.get("/", (req, res) => {
  res.send("API is working with MongoDB Atlas!");
});


// console.log("Registered Routes:");
// app._router.stack.forEach((r) => {
//   if (r.route && r.route.path) {
//     console.log(r.route.path);
//   }
// });

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
