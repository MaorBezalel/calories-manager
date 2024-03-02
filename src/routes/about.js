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
 * @apiError (404) {String} NotFound No developers found.
 * @apiError (500) {String} InternalServerError The server encountered an internal error while trying to get the developers.
 */
router.get('/about', async (req, res) => {
    try {
        const developers = await Developer.find({}, { _id: 0, __v: 0 });
        if (!developers) {
            res.status(404).json({ message: 'No developers found' });
        } else {
            res.status(200).json(developers);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
