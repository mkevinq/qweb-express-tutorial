
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

// A Schema defines the structure of the data we want to store in the database
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }]
}, {
    collection: 'users',
    timestamps: true,
});

// Used to encrypt our passwords
userSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}

// Used to check if the password is correct
userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}

// Used to generate a token that the front-end can use to access protected endpoints
userSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}

// Export our model for use in our routes
module.exports = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
