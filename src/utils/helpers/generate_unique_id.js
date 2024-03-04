/**
 * @fileoverview This file contains a utility function that generates a unique ID.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * A utility function that generates a unique ID.
 *
 * @returns {string} Unique ID
 *
 * @remarks This function relays on the `uuid` package to generate the unique ID.
 */
export const generateUniqueId = () => {
    return uuidv4();
};
