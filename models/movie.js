const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("../models/genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    min: 0,
    max: 255,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movies = mongoose.model("Movie", movieSchema);
function validateMovie(movie) {
  const Schema = {
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255),
  };
  return Joi.validate(movie, Schema);
}
exports.Movies = Movies;
exports.validateMovie = validateMovie;
