import { InferSchemaType, model, Schema } from "mongoose";

/**
 * This schema interacts with the backend MongoDB database and defines the structure of a user.
 * It is designed to hold a user's relevant information, including username, email, and password.
 */

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);