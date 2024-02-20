/**
 * @fileoverview This file contains the route for the endpoint /report.
 *
 * @author Maor Bezalel 325214443
 * @author <firstname> <lastname> <id> @todo add your info Itzik (delete the todo after adding the info)
 */

import { Router } from 'express';

const router = Router();

router.get('/report', (req, res) => {
    /**
     * @todo Add the necessary code to handle the GET endpoint /report (instructions are below).
     * @todo Create/Use pug files to render the report upon successful retrieval of the data from the MongoDB database or an error view if the data is not retrieved. It main serves as a feedback to users that make requests to the server directly from the browser.
     *
     * @instructions
     *
     *    |
     *    |
     *    V
     *
     * @method GET
     * @description This endpoint is used to retrieve a detailed report of calorie consumption for a specific month and year.
     *
     * QUERY PARAMETERS received in the request:
     * @param user_id - The ID of the user for whom the report is being requested.
     * @param year - The year for which the report is being requested.
     * @param month - The month for which the report is being requested.
     *
     * @functionality The endpoint should query the MongoDB database for calorie consumption items matching the specified user, year, and month. It should then generate a JSON response containing a detailed report of calorie consumption for different categories (breakfast, lunch, dinner, other) for the specified month and year.
     *
     * @example The JSON response should look like this:
     * ```json
     * {
     *   "breakfast": [{ "day": 21, "description": "chocolate in ikea", "amount": 300 }, { "day": 5, "description": "milk", "amount": 6 }],
     *   "lunch": [],
     *   "dinner": [],
     *   "other": []
     * }
     * ```
     */
});

export default router;
