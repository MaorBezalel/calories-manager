/**
 * @fileoverview This file contains the model for the user item for the MongoDB database.
 *
 * @author Maor Bezalel
 * @author Itzhak Yakubov
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.Number,
            required: true,
            unique: true,
        },
        first_name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        last_name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        birthday: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
    },
    { collection: 'users' }
);

export const User = mongoose.model('User', userSchema);
