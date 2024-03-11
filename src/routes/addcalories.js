/**
 * @fileoverview This file contains the route for the endpoint /addcalories.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { handleValidationErrors, checkIfUserExists } from '../middlewares/index.js';
import { calorieConsumptionSchema } from '../utils/validation/index.js';
import { CalorieConsumption } from '../models/index.js';
import { generateUniqueId } from '../utils/helpers/index.js';

const router = Router();

/**
 * @api {post} /addcalories Add Calories
 * @apiName AddCalories
 * @apiGroup Calories
 * @apiDescription This endpoint is used to add a new calorie consumption item to the database for an existing user.
 *
 * @apiBody {Number} user_id The ID of the user for whom the calorie consumption item is being added.
 * @apiBody {Number} year The year when the calorie consumption item occurred.
 * @apiBody {Number} month The month when the calorie consumption item occurred.
 * @apiBody {Number} day The day when the calorie consumption item occurred.
 * @apiBody {String} description Description of the calorie consumption item.
 * @apiBody {String} category Category of the calorie consumption item (e.g. breakfast, lunch, dinner, other).
 *
 * @apiSuccess (201) {Object} CalorieConsumption The newly added calorie consumption item as a JSON object with generated ID.
 *
 * @apiError (400) {Object} ValidationErrors An array of errors that occurred during the request parameters validation process
 *                                           (body, query, or path params).
 * @apiUse ErrorValidationExample
 * @apiError (404) {Object} UserNotFound User with the provided {user_id} does not exist; therefore, calories cannot be added.
 * @apiError (500) {Object} InternalServerError The server encountered an internal error while trying to add calories for the user
 *                                              to the database.
 */
router.post(
    '/addcalories',
    checkSchema(calorieConsumptionSchema),
    handleValidationErrors,
    checkIfUserExists(true),
    async (req, res) => {
        // get the validated data from the local object of the response object (attached by the `handleValidationErrors`)
        const data = res.locals.validatedData;

        // generate a unique ID for the new calorie consumption item and attach it to the data
        data.id = generateUniqueId();

        // create a new calorie consumption item
        const newCalorieConsumption = new CalorieConsumption(data);

        // save the new calorie consumption item to the database
        try {
            await newCalorieConsumption.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({
                message: `Error while trying to add calories for the user to the database: ${error.message}`,
            });
        }
    }
);

export default router;
