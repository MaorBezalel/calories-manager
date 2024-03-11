/**
 * @fileoverview This file contains the schema for validating the request body when
 *               adding a new calorie consumption record (POST /addcalories).
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

/**
 * Schema for validating the request body when adding a new calorie consumption record (POST /addcalories).
 * It is passed to the `checkSchema` middleware from the `express-validator` package.
 *
 * @type {import('express-validator').Schema}
 */
export const calorieConsumptionSchema = {
    user_id: {
        in: ['body'],
        notEmpty: { errorMessage: 'user_id parameter is required' },
        isInt: {
            options: { min: 1 },
            errorMessage: 'user_id parameter must be a positive integer (1 or more)',
        },
        toInt: true,
    },

    year: {
        in: ['body'],
        notEmpty: { errorMessage: 'year parameter is required' },
        isInt: { errorMessage: 'year parameter must be an integer' },
        toInt: true,
    },

    month: {
        in: ['body'],
        notEmpty: { errorMessage: 'month parameter is required' },
        isInt: {
            options: { min: 1, max: 12 },
            errorMessage: 'month parameter must be a valid month (between 1 and 12)',
        },
        toInt: true,
    },

    day: {
        in: ['body'],
        notEmpty: { errorMessage: 'day parameter is required' },
        isInt: {
            options: { min: 1, max: 31 },
            errorMessage: 'day parameter must be a valid day (between 1 and 31)',
        },
        toInt: true,
    },

    description: {
        in: ['body'],
        trim: true,
        notEmpty: { errorMessage: 'description parameter is required' },
        isString: { errorMessage: 'description parameter must be a string' },
    },

    category: {
        in: ['body'],
        toLowerCase: true,
        trim: true,
        notEmpty: { errorMessage: 'category parameter is required' },
        isIn: {
            options: [['breakfast', 'lunch', 'dinner', 'other']],
            errorMessage: 'category parameter must be either "breakfast", "lunch", "dinner", or "other"',
        },
    },

    amount: {
        in: ['body'],
        notEmpty: { errorMessage: 'amount parameter is required' },
        isInt: {
            options: { min: 1 },
            errorMessage: 'amount parameter must be a positive integer (1 or more)',
        },
        toInt: true,
    },
};
