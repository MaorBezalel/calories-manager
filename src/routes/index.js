/**
 * @fileoverview This file contains the route for the endpoint /.
 *
 * @author Maor Bezalel
 * @author @todo add your info Itzik (delete the todo after adding the info)
 */

import { Router } from 'express';

const router = Router();

/**
 * @api {get} / Home
 * @apiName Home
 * @apiGroup General
 * @apiDescription This endpoint is the home page of the server.
 *
 * @apiSuccess (200) Renders the home page of the server, which is a list of all the available endpoints with their parameters, descriptions, and functionalities.
 */
router.get('/', (req, res) => {
    res.render('index');
});

export default router;
