/**
 * @fileoverview This file contains the route for the endpoint /report.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { handleValidationErrors, checkIfUserExists, fetchAndGenerateCalorieReport } from '../middlewares/index.js';
import { calorieReportSchema } from '../utils/validation/index.js';

const router = Router();

/**
 * @api {get} /report Report
 * @apiName Report
 * @apiGroup Calories
 * @apiDescription This endpoint is used to retrieve a detailed report of calorie consumption for a specific user in a specific month and year.
 *
 * @apiQuery {Number} user_id The ID of the user for whom the report is being requested.
 * @apiQuery {Number} year The year in which calories were consumed.
 * @apiQuery {Number} month The month in which calories were consumed.
 *
 * @apiSuccess (200) {Object} Report A detailed JSON report of calorie consumption for different categories (breakfast, lunch, dinner, other) for the specified month and year.
 * @apiUse ReportExample
 *
 * @apiError (400) {Object} ValidationErrors An array of errors that occurred during the validation of the request parameters (body, query, or path params).
 * @apiUse ErrorValidationExample
 * @apiError (404) {Object} UserNotFound User with the provided {user_id} does not exist; therefore, a report cannot be generated.
 * @apiError (500) {Object} InternalServerError The server encountered an internal error while trying to generate the report for the user.
 */
router.get(
    '/report',
    checkSchema(calorieReportSchema),
    handleValidationErrors,
    checkIfUserExists(true),
    fetchAndGenerateCalorieReport,
    async (req, res) => {
        // get the report from the locals object of the response object (attached by the `fetchAndGenerateCalorieReport`)
        const report = res.locals.reportData;

        // return to the client the report as a JSON response
        res.status(200).json(report);
    }
);

export default router;
