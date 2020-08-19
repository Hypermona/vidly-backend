const express = require("express");

const { Customers, validateCustomer } = require("../models/customer");

const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
  const customer = await Customers.find();
  res.send(customer);
});
customerRouter.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customre = await Customers.create(req.body);
  res.send(customre);
});
customerRouter.delete("/", async (req, res) => {
  const customre = await Customers.deleteMany({});
  res.send(customre);
});
customerRouter.put("/:id", async (req, res) => {
  const customre = await Customers.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(customre);
});
customerRouter.delete("/:id", async (req, res) => {
  const customre = await Customers.findOneAndRemove(req.params.id);
  res.send(customre);
});

module.exports = customerRouter;
