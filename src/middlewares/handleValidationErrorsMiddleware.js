/**
 * @fileoverview This file contains a middleware that is responsible for sending json error responses when validation errors occur.
 *
 * @author Maor Bezalel
 */

import { validationResult } from 'express-validator';

/**
 * A middleware that sends a json error response when validation errors occur.
 * It uses the `validationResult` function from the `express-validator` package to get the errors (if any) from the request.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 */
export const handleValidationErrorsMiddleware = (req, res, next) => {
    // get the validation errors from the request
    const errors = validationResult(req);

    // if there are no errors, call the next middleware
    if (errors.isEmpty()) {
        return next();
    }

    // if there are any errors, we:

    // 1. Format the errors to be more readable
    const formatedErrors = errors.formatWith(({ location, path, value, msg, nestedErrors }) => ({
        location,
        param: path,
        value,
        message: msg,
        nestedErrors,
    }));

    // 2. Send a json response with the errors
    res.status(400).json({
        errors: formatedErrors.array({ onlyFirstError: true }), // only the first error is sent for each parameter (to avoid confusing the client with too many errors)
    });
};

/**
 * @apiDefine ErrorValidationExample
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "errors": [
 *      {
 *          "location": "body",
 *          "param": "user_id",
 *          "value": "",
 *          "message": "user_id parameter is required"
 *      },
 *      {
 *          "location": "body",
 *          "param": "year",
 *          "value": "",
 *          "message": "year parameter is required"
 *      }
 *    ]
 *  }
 */
