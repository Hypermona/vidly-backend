const genres = require("./routes/genres");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const cust = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const error = require("./middleware/error");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR :jwt private key is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", cust);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
