/**
 * @fileoverview This file contains a wrapped middleware that is responsible for checking
 *               if a user exists in the database and responding accordingly.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import { User } from '../models/index.js';

/**
 * A wrapped middleware that checks if a user exists in the database and
 * responds accordingly based on the value of `shouldExists`.
 *
 * @param {Boolean} shouldExists - A flag that indicates if the user should exist or not.
 *                                 If true, the middleware will respond with an error if the user doesn't exist.
 *                                 If false, the middleware will respond with an error if the user does exist.
 * @return {import('express').RequestHandler} A middleware that checks if a user exists in
 *                                            the database and responds accordingly based on
 *                                            the value of `shouldExists`.
 *
 * @remarks Should be used after `handleValidationErrors` to ensure that the request contains valid parameters.
 */
export const checkIfUserExists = (shouldExists) => async (req, res, next) => {
    // get the validated data from the request
    const data = res.locals.validatedData;

    try {
        // check if user_id exists in the users collection as `id`
        const userExists = !!(await User.findOne({ id: data.user_id }));
        const userDoesNotExistWhenShould = shouldExists && !userExists;
        const userExistsWhenShouldNot = !shouldExists && userExists;

        if (userDoesNotExistWhenShould) {
            res.status(404).json({
                message: `User with id ${data.user_id} does not exist.`,
            });
        } else if (userExistsWhenShouldNot) {
            res.status(409).json({
                message: `User with id ${data.user_id} already exists.`,
            });
        } else {
            // Everything is OK, continue to the next middleware
            next();
        }
    } catch (error) {
        // handle any errors that occurred while trying to check if the user exists
        res.status(500).json({
            message: `Error while trying to check if user exists: ${error.message}`,
        });
    }
};
