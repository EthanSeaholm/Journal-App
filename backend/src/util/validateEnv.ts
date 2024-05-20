import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

/**
 * This file is used to clean and validate information in the environmental file for usage.
 * If any of the environmental variables are invalid, an error is thrown.
 */

export default cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: port(),
    SESSION_SECRET: str(),
});