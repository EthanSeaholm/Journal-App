import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

/**
 * This file connects the application to its backend MongoDB database.
 * If an error occurs, it will be caught and logged to the console.
 */

const port = env.PORT;

// connects application to MongoDB database
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);