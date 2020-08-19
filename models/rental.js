const Joi = require("joi");

const mongoose = require("mongoose");

const rental = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 11,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        maxlength: 10,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now(),
  },
  dateRented: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rental);

function validateRental(item) {
  const Schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(item, Schema);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
