/**
 * @fileoverview This file contains the route for the endpoint /about.
 *
 * @author Maor Bezalel 325214443
 * @author <firstname> <lastname> <id> @todo add your info Itzik (delete the todo after adding the info)
 */

import { Router } from 'express';

const router = Router();

router.get('/about', (req, res) => {
    /**
     * @todo Add the necessary code to handle the GET endpoint /about (instructions are below).
     * @todo Create/Use pug files to render the about view. It main serves as a feedback to users that make requests to the server directly from the browser.
     *
     * @instructions
     *
     *    |
     *    |
     *    V
     *
     * @method GET
     * @description This endpoint is used to retrieve information about the developers.
     *
     * @params No parameters expected.
     *
     * @functionality The endpoint should return a JSON array containing objects describing each developer involved in the project.
     * Each object should include details such as first name, last name, ID, and email address of the developers.
     *
     * @example The JSON response should look like this:
     * ```json
     * [
     *   {“firstname”:”dave”,”lastname”:”cohen”,”id”:234234,”email”:”daddd@gmail.com”},
     *   {“firstname”:”tal”,”lastname”:”levy”,”id”:34534544,”email”:”tal@gmail.com”}
     * ]
     * ```
     */
});

export default router;
