import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import entriesRoutes from "./src/routes/entries";
import userRoutes from "./src/routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./src/util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./src/middleware/auth";

/**
 * This file launches the Express application that the backend is built on.
 * It manages user sessions, contains routes, and handles errors.
 */

const app = express();  // creates and stores an express application in "app"

const corsOptions = {
    origin: "https://www.prog-ress.live",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
        mongoUrl: env.MONGODB_URI,
    }),
}));

// routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ message: "Welcome to the [Prog]ress API" }); // base route to confirm the API is working
});
app.use("/entries", requiresAuth, entriesRoutes);   // entries route to fetch and display entries - auth is required
app.use("/users", userRoutes);  // users route to fetch and display current user

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