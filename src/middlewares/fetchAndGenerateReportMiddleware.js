/**
 * @fileoverview This file contains the middleware for fetching and generating a report on calorie consumption.
 *
 * @author Maor Bezalel
 * @author @todo Add your info Itzik (delete the todo after adding the info)
 */

import { CalorieConsumption } from '../models/index.js';

/**
 * This middleware fetches the calorie consumption items from the database based on query parameters specified in the request and generates a report.
 * The report is then attached to the locals object of the response object to be available to the next middleware.
 *
 * @param {import('express').Request} req The request object.
 * @param {import('express').Response} res The response object.
 * @param {import('express').NextFunction} next The next function.
 *
 * @remarks
 * - The report is attached to `res.locals.reportData`.
 * - This middleware should be used after `handleValidationErrorsMiddleware` to ensure that the request contains valid query parameters.
 * to ensure that the request contains valid query parameters.
 */
export const fetchAndGenaerateReportMiddleware = async (req, res, next) => {
    // get the validated data from the locals object of the response object (attached by the `handleValidationErrorsMiddleware`)
    const data = res.locals.validatedData;

    // query the database for calorie consumption items matching the specified user, year, and month
    try {
        const calorieConsumptionItems = await CalorieConsumption.find({
            user_id: data.user_id,
            year: data.year,
            month: data.month,
        });

        // generate a JSON response containing a detailed report of calorie consumption for different categories
        const reportData = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: [],
        };
        calorieConsumptionItems.forEach((item) => {
            reportData[item.category].push({
                day: item.day,
                description: item.description,
                amount: item.amount,
            });
        });

        // attach the report to the locals object of the response object
        res.locals.reportData = reportData;

        // call the next middleware
        next();
    } catch (error) {
        res.status(500).json({ message: `Error while trying to get report: ${error.message}` });
    }
};

/**
 * @apiDefine ReportExample
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "breakfast": [{ "day": 21, "description": "chocolate in ikea", "amount": 300 }, { "day": 5, "description": "milk", "amount": 6 }],
 *      "lunch": [],
 *      "dinner": [],
 *      "other": []
 *  }
 */
