import { RequestHandler } from "express";
import createHttpError from "http-errors";

/** 
* Middleware function to authenticate users for accessing certain routes.
* Checks and validates that the user making the request is authenticated and able to proceed.
* 
* @param req - The Express request object.
* @param res - The Express response object.
* @param next - The next function to call the middleware.
* 
* The following function ensures that the user making the request is authorized by verifying its userId and the userId inside the current session object.
* If the user is authenticated, they are granted access. If not, a 401 Unathorized error is sent back.
*/

export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {   // verifies that the userId on the current request is the same as the userId inside the current session object
        next();
    } else {
        next(createHttpError(401, "User not autheticated"));
    }
};