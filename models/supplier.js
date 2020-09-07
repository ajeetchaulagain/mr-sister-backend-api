const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { itemSchema } = require("./item");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 55,
  },
  address: {
    type: String,
    required: true,
    maxlength: 80,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  expectedDelivery: {
    type: Number,
    required: true,
  },
  items: [itemSchema],
});

const Supplier = mongoose.model("Supplier", supplierSchema);

const validateSupplier = (supplier) => {
  const supplierValidationSchema = Joi.object({
    name: Joi.string().required().max(20),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNo: Joi.string().required(),
    expectedDelivery: Joi.number().required(),
  });
  return supplierValidationSchema.validate(supplier);
};

module.exports = {
  Supplier,
  validateSupplier,
};
