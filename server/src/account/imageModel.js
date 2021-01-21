
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Define the structure of our image data
const imageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: false,
    },
    url:{
        type: String,
        required: true,
    },
    skills:{
        type: Array,
        required: true,
    },
    createdBy:{
        type: String,
        required:true,
    },
    createdAt:{
        type: Date,
        required: true,
    }
});

// Export our model for use in our routes
module.exports = mongoose.model("Image", imageSchema);
imageSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
