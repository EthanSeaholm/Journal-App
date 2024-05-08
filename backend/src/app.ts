import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import entriesRoutes from "./routes/entries";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

/**
 * This file launches the Express application that the backend is built on.
 * It manages user sessions, contains routes, and handles errors.
 */

const app = express();  // creates and stores an express application in "app"

app.use(morgan("dev"));     // enables color-coded reponse statuses for development use

app.use(express.json());    // enables application to parse incoming request bodies in JSON format

// user session management
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

// routes
app.use("/api/entries", requiresAuth, entriesRoutes);   // entriesRoutes is set to path /api/entries, but auth is required first
app.use("/api/users", userRoutes);  // userRoutes is set to path /api/users

// error handler for unknown/nonexisting endpoints
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// error handler for unknown errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "UNKNOWN ERROR";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;