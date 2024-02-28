/**
 * @fileoverview This file contains the validation schema for the endpoint /report.
 *
 * @author Maor Bezalel
 * @author @todo add your info Itzik (delete the todo after adding the info)
 */

/**
 * Scheam for validating the request query parameters when getting a report on calorie consumption (GET /report).
 * It is passed to the `checkSchema` middleware from the `express-validator` package.
 *
 * @type {import('express-validator').Schema}
 */
export const getReportOnCalorieConsumptionValidationScheme = {
    user_id: {
        in: ['query'],
        notEmpty: {
            errorMessage: 'user_id parameter is required',
        },
        isInt: {
            options: {
                min: 1,
            },
            errorMessage: 'user_id parameter must be a positive integer (1 or more)',
        },
        toInt: true,
    },

    year: {
        in: ['query'],
        notEmpty: {
            errorMessage: 'year parameter is required',
        },
        isInt: {
            errorMessage: 'year parameter must be an integer',
        },
        toInt: true,
    },

    month: {
        in: ['query'],
        notEmpty: {
            errorMessage: 'month parameter is required',
        },
        isInt: {
            options: {
                min: 1,
                max: 12,
            },
            errorMessage: 'month parameter must be a valid month (between 1 and 12)',
        },
        toInt: true,
    },
};
