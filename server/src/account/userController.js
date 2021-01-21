
const User = require("./userModel");
const Image = require("./imageModel");

const mongoose = require("mongoose");
const fs = require('fs');
const Grid = require('gridfs-stream');
const ONE_DAY_MILLISECONDS = 86400000;

// Create a new user
exports.registerNewUser = async (req, res) => {
    try {
        // This creates a "User" object that WILL be saved to our database later
        let user = new User({
            name: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: null
        })

        // Encrypts their password
        user.password = await user.hashPassword(req.body.password);

        // Saves the "User" object to the database
        let createdUser = await user.save();

        // Send a response back to the sender telling you that it's successful
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        })
    } catch (err) {
        // Otherwise send a response back telling you that it's unsucessful
        console.log(err)
        res.status(500).json({
            msg:"AHH something went wrong",
            error: err
        })
    }
}

// Logs a user in, and responds back with a token upon successful login
exports.loginUser = async (req, res) => {
    // Extract the given email and password
    const login = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        // Search our database for a user that has the given e-mail
        let user = await User.findOne({
            email: login.email
        });

        // If they don't exist, then send a response back saying the login failed
        if (!user) {
            res.status(400).json({
                type: 'Not Found',
                msg: "Wrong login details."
            })
        }

        // Otherwise, compare the sent password with the password in our database
        // See userModel.js
        let match = await user.compareUserPassword(login.password, user.password);

        if (match) {
            // If there is a match, generate a JSON Web Token that the front-end can use to access protected endpoints
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: ONE_DAY_MILLISECONDS
            })

            // Send a response saying the login was successful
            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        } else {
            // Otherwise, send a response back saying the login failed
            res.status(400).json({
                types: "Not Found",
                msg: "Wrong Login Details :("
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "AHH Something Went Wrong!",
            msg: err
        })
    }
}

// PROTECTED ENDPOINT: A Bearer token must be provided
// This will retrieve information about the user
exports.userList = async (req, res) => {
    // Using our Schema object, find a user id that matches the id encrypted inside of the JWT
    User.findOne({ _id: new mongoose.Types.ObjectId(req.userData.user._id) })
    .then(data => {
        // Send a response back with the user's data
        res.status(200).json({
            message: "User list retrieved successfully!",
            user: data
        });
    })
    .catch(err => {
        // Send a response back with an error if the user could not be found somehow
        console.log(err),
        res.status(500).json({
            error: err
        });
    });
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
