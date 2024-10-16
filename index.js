require("dotenv").config(); // To enable .env called
const bodyParser = require("body-parser");
const express = require("express"); // Import express
const app = express();
const port = process.env.PORT || 3000;
require("express-async-errors");
const router = require("./src/routes/index.js");
const {
  errorHandler,
  notFoundURLHandler,
} = require("./src/middlewares/errors.js");
const fileUpload = require("express-fileupload");

app.use(express.json());

// Buat routing dan response
app.get("/", (req, res) => {
  res.send("Ping Succesfully");
});

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/", router);
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);
// Running Aplikasi Express.js
app.listen(port, () => {
  console.log(`the express.js app is running on port ${port}`);
});
