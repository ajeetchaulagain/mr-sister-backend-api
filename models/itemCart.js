const mongoose = require("mongoose");
const Joi = require("joi");

const itemCartSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const validateItemCartSchema = (itemCart) => {
  const itemCartValidationSchema = Joi.object({
    itemName: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  });

  return itemCartValidationSchema.validate(itemCart);
};

module.exports = {
  itemCartSchema,
  validateItemCartSchema,
};
