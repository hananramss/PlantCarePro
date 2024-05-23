const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const Admin = mongoose.model("Admin", signUpSchema, "admin");

module.exports = Admin;