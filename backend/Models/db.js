const mongoose = require('mongoose');
// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!" , mongoose.connection.name))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

module.exports = mongoose


