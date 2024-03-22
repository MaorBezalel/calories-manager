import express from 'express';
import { homeRouter, aboutRouter, addcaloriesRouter, reportRouter } from '../../src/routes/index.js';

/**
 * Create an express app with all the routes.
 *
 * @returns {express.Express} the app
 *
 * @remarks Used for testing the app without starting the server and connecting to the database.
 */
export const createApp = () => {
    const app = express();

    // use middlewares
    app.use(express.json()); // for parsing application/json

    // use routes
    app.use(homeRouter);
    app.use(aboutRouter);
    app.use(addcaloriesRouter);
    app.use(reportRouter);
    app.use(express.static('public'));

    // view engine setup
    app.set('view engine', 'pug');
    app.set('views', './src/views');

    return app;
};
