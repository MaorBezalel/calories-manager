/**
 * @fileoverview This file contains the model for the calorie consumption item for the MongoDB database.
 *
 * @author Maor Bezalel
 * @author @todo add your info Itzik (delete the todo after adding the info)
 */

import mongoose from 'mongoose';

const calorieConsumptionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },

        year: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },

        month: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },

        day: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },

        description: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

        amount: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
    },
    { collection: 'calories' }
);

export const CalorieConsumption = mongoose.model('CalorieConsumption', calorieConsumptionSchema);
