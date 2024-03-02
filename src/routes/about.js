/**
 * @fileoverview This file contains the route for the endpoint /about.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import { Router } from 'express';
import { Developer } from '../models/index.js';

const router = Router();

/**
 * @api {get} /about About
 * @apiName About
 * @apiGroup General
 * @apiDescription This endpoint is used to retrieve information about the developers.
 *
 * @apiSuccess (200) {Object[]} Developers An array of objects describing each developer involved in the project.
 *
 * @apiError (404) {Object} NotFound No developers found.
 * @apiError (500) {Object} InternalServerError The server encountered an internal error while trying to get the developers.
 */
router.get('/about', async (req, res) => {
    try {
        // get all developers from the database
        const developers = await Developer.find({}, { _id: 0, __v: 0 });

        if (!developers) {
            // if no developers were found - return 404 with a message
            res.status(404).json({ message: 'No developers found' });
        } else {
            // if developers were found - return 200 with the developers data as a JSON array response
            res.status(200).json(developers);
        }
    } catch (error) {
        // if an error occurred while fetching the developers - return 500 with an error message
        res.status(500).json({ message: `Error while trying to get developers: ${error.message}` });
    }
});

export default router;
