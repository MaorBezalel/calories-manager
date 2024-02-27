/**
 * @fileoverview This file contains a wrapped middleware that is responsible for checking if a user exists in the database and responding accordingly.
 * @author @todo add your info Itzik (delete the todo after adding the info)
 *
 * @author Maor Bezalel
 */

import { matchedData } from 'express-validator';
import { User } from '../models/index.js';

/**
 * A wrapped middleware that checks if a user exists in the database and responds accordingly.
 *
 * @param {shouldExists} boolean - A flag that indicates if the user should exist or not. If true, the middleware will respond with an error if the user does not exist. If false, the middleware will respond with an error if the user does exist.
 * @return {import('express').RequestHandler} - A middleware.
 *
 * @remarks Should only be used after the request body has been validated.
 */
export const checkIfUserExistsMiddleware = (shouldExists) => async (req, res, next) => {
    // get the validated data from the request
    const data = matchedData(req);

    // check if user_id exists in the users collection as `id`
    const userExists = !!(await User.findOne({ id: data.user_id }));

    if (shouldExists && !userExists) {
        return res.status(404).send(`User with id ${data.user_id} does not exist.`);
    } else if (!shouldExists && userExists) {
        return res.status(409).send(`User with id ${data.user_id} already exists.`);
    } else {
        next();
    }
};
