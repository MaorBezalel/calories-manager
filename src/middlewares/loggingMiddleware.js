/**
 * @fileoverview This file contains a middleware that logs request information to the console for debugging purposes.
 *
 * @author Maor Bezalel
 */

/**
 * Middleware for logging request information (method and URL) to the console for debugging purposes.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Function to call the next middleware.
 */
export const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
