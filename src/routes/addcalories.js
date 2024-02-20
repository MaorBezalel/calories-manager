/**
 * @fileoverview This file contains the route for the endpoint /addcalories.
 *
 * @author Maor Bezalel 325214443
 * @author <firstname> <lastname> <id> @todo add your info Itzik (delete the todo after adding the info)
 */

import { Router } from 'express';

const router = Router();

router.post('/addcalories', (req, res) => {
    /**
     * @todo Add the necessary code to handle the POST endpoint /addcalories (instructions are below).
     * @todo Create validation schemas for the request body parameters (use the `express-validator` package).
     * @todo Create a model for the calorie consumption item for the MongoDB database (use the `mongoose` package).
     * @todo Create/Use pug files to render the appropriate view for the request based on its result (e.g., if the item is added successfully, render a success view; if the item is not added, render an error view). It main serves as a feedback to users that make requests to the server directly from the browser.
     *
     * @instructions
     *
     *      |
     *      |
     *      V
     *
     * @method POST
     * @description this endpoint is used to add a new calorie consumption item.
     *
     * BODY PARAMETERS received in the request:
     * @param user_id - The ID of the user for whom the calorie consumption item is being added.
     * @param year - The year of the calorie consumption item.
     * @param month - The month of the calorie consumption item.
     * @param day - The day of the calorie consumption item.
     * @param description - Description of the calorie consumption item.
     * @param category - Category of the calorie consumption item (e.g., breakfast, lunch, dinner, other).
     * @param amount - Amount of calories consumed.
     *
     * @functionality The endpoint should receive the parameters mentioned above and add a new calorie consumption item to the MongoDB database. The ID of the item will be generated on the server side.
     */
});

export default router;
