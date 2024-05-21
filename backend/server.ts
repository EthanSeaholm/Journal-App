import cors from "cors";
import app from "./app";
import env from "./src/util/validateEnv";
import mongoose from "mongoose";

/**
 * This file connects the application to its backend MongoDB database.
 * If an error occurs, it will be caught and logged to the console.
 */

const port = env.PORT;

app.use(cors({
    origin: "https://prog-ress.live"
}));

// connects application to MongoDB database
mongoose.connect(env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database: ", error);
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://www.prog-ress.live");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

export default app;