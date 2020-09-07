const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const validateItem = (item) => {
  const itemValidationSchema = Joi.object({
    itemName: Joi.string().required(),
    unit: Joi.string().required(),
    price: Joi.number().required(),
  });

  return itemValidationSchema.validate(item);
};

module.exports = {
  itemSchema,
  validateItem,
};
