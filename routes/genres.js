const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { Genre, validateGenre } = require("../models/genre");

router.get("/", async (req, res) => {
  const genre = await Genre.find({}).sort("name");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

router.delete("/:id", auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });
  // if (!genre)
  //   return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
