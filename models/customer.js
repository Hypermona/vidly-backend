const Joi = require("joi");
const mongoose = require("mongoose");

const cust = new mongoose.Schema({
  isGold: Boolean,
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const Customers = mongoose.model("customer", cust);
function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(999999).max(99999999999).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(genre, schema);
}

exports.Customers = Customers;
exports.validateCustomer = validateCustomer;
