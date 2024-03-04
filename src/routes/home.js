/**
 * @fileoverview This file contains the route for the endpoint /.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import { Router } from 'express';

const router = Router();

/**
 * @api {get} / Home
 * @apiName Home
 * @apiGroup General
 * @apiDescription Renders the home page of the server, which is a list of all the available endpoints with their parameters, descriptions, and functionalities.
 */
router.get('/', (req, res) => {
    res.render('home');
});

export default router;
