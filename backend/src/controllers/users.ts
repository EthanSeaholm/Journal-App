import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

/**
 * Handles user sign-up, login, and logout functionalities.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next function to call the middleware.
 */

// The getAuthenticatedUser request handler fetches the authenticated user's information.
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();      // fetches the user and their email field specifically via the userId stored in the session
        res.status(200).json(user);     // if a user is found, a 200 OK response is sent back containing the user's information
    } catch (error) {
        next(error);        // if an error occurs, the error is forwarded to the error-handling middleware
    }
};

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

// The signUp request handler handles the creation of a new user.
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Required information missing");     // if username, email, or password are left blank, a 400 Bad Request response is thrown
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();        // checks to see if a username is already taken

        if (existingUsername) {
            throw createHttpError(409, "Username is already taken, please choose a different one");     // if a username is already taken, a 409 Conflict error is thrown
        }

        const exisitingEmail = await UserModel.findOne({ email: email }).exec();        // checks to see if an email is already being used

        if (exisitingEmail) {
            throw createHttpError(409, "Email is already in use, please choose a different one");       // if an email is already being used, a 409 Conflict error is thrown
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);      // hashes and encrypts the provided password for security purposes

        const newUser = await UserModel.create({        // if all parameters are included and valid, attempt to create a new user
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;       // the new user's Id is stored in the session

        res.status(201).json(newUser);      // if a new user is successfuly created, a 201 Created response is sent back
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

// The login request handler handles the login logic for existing users.
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");       // if a required parameter is missing when trying to log in, a 400 Bad Request error is thrown
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();     // fetches a user via their username and if found, returns the user's information, including their email

        if (!user) {
            throw createHttpError(401, "Invalid username or password");     // if a user does not exist, a nonspecific 401 Unauthorized error is thrown
        }

        const passwordMatch = await bcrypt.compare(password, user.password);        // checks to see if the entered password matches the stored password

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid username or password");     // if the entered password does not match the stored password, a nonspecific 401 Unauthorized error is thrown
        }

        req.session.userId = user.id;       // the user's Id is stored in the session
        res.status(201).json(user);     // if the login attempt is successful, a 201 Created response is sent back
    } catch (error) {
        next(error)
    }
};

// User logout functionality is implemented by destroying the current session.
export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {      // destroys the current session
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);        // if logout and descruction of the session is successful, a 200 OK response is sent back
        }
    })
};