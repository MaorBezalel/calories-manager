/**
 * @fileoverview This file contains a middleware that logs request information to the
 *               console for debugging purposes only.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

/**
 * A middleware for logging request information (method and URL)
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Function to call the next middleware.
 *
 * @remarks Used for debugging purposes only.
 */
export const logRequestDetails = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
