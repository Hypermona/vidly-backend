const express = require("express");
const { Movies, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");

const movieRouter = express.Router();

movieRouter
  .route("/")
  .get(async (req, res) => {
    const movies = await Movies.find({}).sort("name");
    res.send(movies);
  })
  .post(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid Genre");

    const movie = new Movies({
      title: req.body.title,
      genre: {
        _id: genre.id.send,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    res.send(await movie.save());
  });

movieRouter
  .route("/:id")
  .put(async (req, res) => {
    // const { error } = validateMovie(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) return req.status(400).send("No movie with this id");
    res.send(await movie.save());
  })
  .get(async (req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) return res.status(400).send("No Movies with this id");
    res.send(movie);
  })
  .delete(async (req, res) => {
    const movie = await Movies.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(400).send("No Movies with this id");
    res.send(movie);
  });

module.exports = movieRouter;
