/**
 * @fileoverview This file contains a middleware that is responsible for sending json error responses when validation errors occur.
 *
 * @author Maor Bezalel
 */

import { validationResult, matchedData } from 'express-validator';

/**
 * A middleware that sends a json error response when validation errors occur; otherwise, it attaches
 * the validated data to the locals object of the response object to be used by the next middleware.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 *
 * @remarks
 * - The validated data is attached to `res.locals.validatedData`.
 * - This middleware should be used after the express-validator's [checkSchema](https://express-validator.github.io/docs/api/check-schema/#checkschema) middleware to be able to get the validation results from [validationResult](https://express-validator.github.io/docs/api/validation-result/#validationresult) and the validated data from [matchedData](https://express-validator.github.io/docs/api/matched-data/#matcheddata).
 */
export const handleValidationErrorsMiddleware = (req, res, next) => {
    // get the validation errors from the request
    const errors = validationResult(req);

    // if there are no errors, call the next middleware
    if (errors.isEmpty()) {
        // get the validated data from the request and attach it to the locals object of the response object
        res.locals.validatedData = matchedData(req);

        // finish and call the next middleware
        return next();
    }

    // if there are any errors, we:

    // 1. Format the errors for the client
    const formatedErrors = errors.formatWith(({ location, path, value, msg, nestedErrors }) => ({
        location,
        param: path,
        value,
        message: msg,
        nestedErrors,
    }));

    // 2. Send a json response with the errors
    // only the first error is sent for each parameter (to avoid confusing the client with too many errors)
    res.status(400).json({
        errors: formatedErrors.array({ onlyFirstError: true }),
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
