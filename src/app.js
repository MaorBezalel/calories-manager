import express from "express";

const app = express();

// simple server to test the app (write in the terminal: `npm run start:dev`)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
