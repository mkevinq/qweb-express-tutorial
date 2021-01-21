const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./account/userRoute"); 

// Initialize our app (always do this first)
const app = express();

// Setup our connection to mongoDB
require("./config/db")(app);

// Enable CORS
app.use(cors());

// Serve any static files located in the public folder
app.use('/public', express.static('public'));

// Automatically parse an "application/x-www-form-urlencoded" body
app.use(bodyParser.urlencoded({
    extended:false
}));

// Automatically parse an "application/json" body
app.use(bodyParser.json())

// Morgan is a middleware that logs some debugging information whenever requests are sent to the backend
app.use(morgan("dev"));

// User routes
app.use("/user", userRoutes);

// Start the app!
app.listen(PORT, () => {
    console.log(`App is travelling on Port ${PORT}`)
})
