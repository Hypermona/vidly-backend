const express = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const config = require("config");

router.route("/").post(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is incorrect! :(");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid)
    return res.status(400).send("Email or Password is incorrect! :(");
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  // res.send("Successfuly Logged in :)");
  res.send(token);
});

function validate(user) {
  const Schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(18).required(),
  };
  return Joi.validate(user, Schema);
}

module.exports = router;
