const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const mongoURI = process.env.MONGO_URI;

// Create connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 60000,
}).then(() => {
  console.log("✅ MongoDB Connected!");
}).catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
});

const conn = mongoose.connection;
let gfs = null;
let bucket = null;

const connectionPromise = new Promise((resolve, reject) => {
    conn.once("open", () => {
        try {
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection("resumes");

            bucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: "resumes"
            });

            console.log("✅ GridFS Connected!");
            resolve({ conn, gfs, bucket }); // ✅ Return all required values
        } catch (err) {
            reject(err);
        }
    });

    conn.on("error", (err) => {
        console.error("❌ GridFS Connection Error:", err);
        reject(err);
    });
});

async function ensureConnection() {
    try {
        return await connectionPromise; // ✅ Always return the connection object
    } catch (error) {
        console.error("❌ ensureConnection() failed:", error);
        return { conn: null, gfs: null, bucket: null }; // Return null values to avoid undefined errors
    }
}

// ✅ Export properly
module.exports = { conn, gfs, bucket, ensureConnection };
