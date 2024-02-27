/**
 * @fileoverview This file contains the route for the endpoint /addcalories.
 *
 * @author Maor Bezalel
 * @author @todo add your info Itzik (delete the todo after adding the info)
 */

import { Router } from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { handleValidationErrorsMiddleware, checkIfUserExistsMiddleware } from '../middlewares/index.js';
import { addNewCalorieConsumptionValidationSchema } from '../validation-schemas/addNewCalorieConsumptionValidationSchema.js';
import { CalorieConsumption } from '../models/index.js';

const router = Router();

/**
 * @api {post} /addcalories Add Calories
 * @apiName AddCalories
 * @apiGroup Calories
 * @apiDescription This endpoint is used to add a new calorie consumption item to the database for an existing user.
 *
 * @apiBody {Number} user_id The ID of the user for whom the calorie consumption item is being added.
 * @apiBody {Number} year The year of the calorie consumption item.
 * @apiBody {Number} month The month of the calorie consumption item.
 * @apiBody {Number} day The day of the calorie consumption item.
 * @apiBody {String} description Description of the calorie consumption item.
 * @apiBody {String} category Category of the calorie consumption item (e.g., breakfast, lunch, dinner, other).
 *
 * @apiSuccess (201) {String} CaloriesAdded Calories added successfully for user with ID: {user_id}!
 *
 * @apiError (400) {Object[]} ValidationErrors An array of errors that occurred during the validation of the request parameters (body, query, or path params).
 * @apiUse ErrorValidationExample
 * @apiError (404) {String} UserNotFound User with the provided {user_id} does not exist; therefore, calories cannot be added.
 * @apiError (500) {String} InternalServerError The server encountered an internal error while trying to add calories for the user to the database.
 */
router.post(
    '/addcalories',
    checkSchema(addNewCalorieConsumptionValidationSchema),
    handleValidationErrorsMiddleware,
    checkIfUserExistsMiddleware(true),
    async (req, res) => {
        // get the validated data from the request
        const data = matchedData(req);

        // create a new calorie consumption item
        const newCalorieConsumption = new CalorieConsumption(data);

        // save the new calorie consumption item to the database
        try {
            await newCalorieConsumption.save();
            res.status(201).send(`Calories added successfully for user with ID: ${data.user_id}!`);
        } catch (error) {
            res.status(500).send(`Error while trying to add calories: ${error.message}`);
        }
    }
);

export default router;
