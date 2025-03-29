const mongoose = require('mongoose');
const { conn } = require('./db');  // Import the connection from your db.js file
const schema = mongoose.Schema;

const userschema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// Use conn.model instead of mongoose.model
const userModel = conn.model('users', userschema);
module.exports = userModel;