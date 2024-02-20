// simple server to test the app (write in the terminal: `npm run start:dev`)

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
