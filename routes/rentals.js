const express = require("express");
const { Rental, validateRental } = require("../models/rental");
const { Movies } = require("../models/movie");
const { Customers } = require("../models/customer");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);
router
  .route("/")
  .get(async (req, res) => {
    const rentals = await Rental.find({}).sort("-dateOut");
    res.send(rentals);
  })
  .post(async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customers.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer");
    const movie = await Movies.findById(req.body.movieId);
    if (!movie) return res.status(400).send("No movies available in this Id");

    if (movie.numberInStock === 0)
      return res.status(400).send("Current Movie is Out of stock");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
    try {
      new Fawn.Task()
        .save("rentals", rental)
        .update(
          "movies",
          { _id: movie._id },
          {
            $inc: { numberInStock: -1 },
          }
        )
        .run();
      res.send(rental);
    } catch (ex) {
      res.status(500).send("Something went Wrong");
    }
  });

module.exports = router;
