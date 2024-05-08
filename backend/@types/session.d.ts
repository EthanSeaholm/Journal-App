import mongoose from "mongoose";

/**
 * Each session contains a userId when a session object is created.
 * The userId represents a unique identifier for each user to be used in the backend MongoDB database. 
 */

declare module "express-session" {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}