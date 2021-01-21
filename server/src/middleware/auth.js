const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        // Extract the token from the headers of the request
        const token = req.headers.authorization.split("Bearer ")[1];
        
        // Verify the token (this method returns the decoded token if it is valid)
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;

        // Since this is a middleware, it's important that you run next() somewhere
        // This is so that the user can actually reach the route that they want to go to
        next();
    } catch (err) {
        // If verification failed, then send a corresponding response
        return res.status(401).json({
            message:"Authentication Failed"
        });
    }
};