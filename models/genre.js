const Joi = require("joi");
const mongoose = require("mongoose");

const genres = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Genre = mongoose.model("genre", genres);
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}
exports.genreSchema = genres;
exports.Genre = Genre;
exports.validateGenre = validateGenre;
