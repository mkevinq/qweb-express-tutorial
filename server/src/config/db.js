// mongoose is a third-party library that allows us to easily interface with mongoDB
const mongoose = require("mongoose");

module.exports = function (app){
    // Your url goes here
    mongoose.connect("", {
        useUnifiedTopology: true,
        useNewUrlParser:true,
        useFindAndModify:false,
    })
    .then(connection => console.log("Application is connected to DB"))
    .catch(err => console.log(err));

    // Run the cleanup function (disconnect) whenever we stop the app
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    // Add mongoose as a setting to our express app (we can retrieve it later)
    if(app) {
        app.set("mongoose", mongoose);
    }
};

function cleanup(){
    mongoose.connection.close(function () {
        process.exit(0);
    });
}
