/**
 * @fileoverview This file contains the main app that runs the server.
 *
 * @author Maor Bezalel 325214443
 * @author <firstname> <lastname> <id> @todo add your info Itzik (delete the todo after adding the info)
 */

// import express
import express from 'express';

// import routes
import indexRouter from './routes/index.js';
import aboutRouter from './routes/about.js';
import addcaloriesRouter from './routes/addcalories.js';
import reportRouter from './routes/report.js';

// create an express app
const app = express();

// use routes
app.use(indexRouter);
app.use(aboutRouter);
app.use(addcaloriesRouter);
app.use(reportRouter);

// view engine setup
app.set('view engine', 'pug');
app.set('views', './src/views');

// set the port
const PORT = process.env.PORT || 3000;

// listen to the server on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
