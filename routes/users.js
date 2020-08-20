const express = require("express");
const _pick = require("lodash/pick");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").post(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_pick(req.body, ["name", "email", "password"]));
  const solt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, solt);
  user = await user.save();
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.header("x-auth-token", token).send(_pick(user, ["_id", "name", "email"]));
});

module.exports = router;
