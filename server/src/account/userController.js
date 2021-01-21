
const User = require("./userModel");
const Image = require("./imageModel");

const mongoose = require("mongoose");
const fs = require('fs');
const Grid = require('gridfs-stream');
const ONE_DAY_MILLISECONDS = 86400000;

// Create a new user
exports.registerNewUser = async (req, res) => {
}

// Logs a user in, and responds back with a token upon successful login
exports.loginUser = async (req, res) => {
}

// PROTECTED ENDPOINT: A Bearer token must be provided
// This will retrieve information about the user
exports.userList = async (req, res) => {
}

// PROTECTED ENDPOINT: A Bearer token must be provided
// This will retrieve the images that were created by our user
exports.imageList = async (req, res) => {
    // Using our Image Schema object, find images that were created by the user id that was encrypted inside the JWT
    Image.find({ createdBy: new mongoose.Types.ObjectId(req.userData.user._id) })
    .then(data => {
        // Send a response back with the user's images
        res.status(200).json({
            message: "Image list retrieved successfully!",
            images: data.reverse()
        });
    })
    .catch(err => {
        // Send a response back with an error if no images could be found
        console.log(err),
        res.status(500).json({
            error: err
        });
    });
}
