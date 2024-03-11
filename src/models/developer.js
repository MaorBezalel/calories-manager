/**
 * @fileoverview This file contains the model for the developer entity for the MongoDB database.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema(
    {
        firstname: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

        lastname: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

        id: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },

        email: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
    },
    { collection: 'developers' }
);

export const Developer = mongoose.model('Developer', developerSchema);
