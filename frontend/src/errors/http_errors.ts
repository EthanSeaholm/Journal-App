/**
 * Defines custom error types for specific HTTP status codes.
 * Extends from the base HttpError class, allowing for more concise error handling.
 */

class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * 401 Unauthorized HTTP error.
 * Inherits from the HttpError class above.
 */
export class UnauthorizedError extends HttpError { }

/**
 * 409 Conflict HTTP error.
 * Inherits from the HttpError class above.
 */
export class ConflictError extends HttpError { }