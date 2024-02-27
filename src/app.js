/**
 * @fileoverview This file contains the main app that runs the server.
 *
 * @author Maor Bezalel
 * @author <firstname> <lastname> <id> @todo add your info Itzik (delete the todo after adding the info)
 */

// import express for creating the server
import express from 'express';

// import mongoose for database connection
import mongoose from 'mongoose';

// import dotenv for environment variables
import 'dotenv/config';

// import middlewares
import { loggingMiddleware } from './middlewares/index.js';

// import routes (endpoints)
import indexRouter from './routes/index.js';
import aboutRouter from './routes/about.js';
import addcaloriesRouter from './routes/addcalories.js';
import reportRouter from './routes/report.js';

// create an express app
const app = express();

// connect to the database using mongoose
mongoose
    .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

// use middlewares
app.use(express.json()); // for parsing application/json
app.use(loggingMiddleware);

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
