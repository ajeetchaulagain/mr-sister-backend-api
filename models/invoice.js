const mongoose = require("mongoose");
const Joi = require("joi");

const { itemCartSchema } = require("./itemCart");

const invoiceSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
    maxlength: 50,
  },

  orderDate: {
    type: Date,
    default: Date.now(),
  },

  supplierEmail: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  invoiceStatus: {
    type: String, // should be one from completed, pending, issues
    required: true,
    default: "pending",
  },
  referenceNo: {
    type: String,
  },
  issueDescription: {
    type: String,
  },
  orderedItems: [itemCartSchema],
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

const validateInvoice = (invoice) => {
  const invoiceValidationSchema = Joi.object({
    createdBy: Joi.string().required().max(50),
    orderDate: Joi.string(),
    supplierEmail: Joi.string().required().email(),
    supplierName: Joi.string().required(),
    invoiceStatus: Joi.string(),
    referenceNo: Joi.string(),
    orderedItems: Joi.array().items(Joi.object()),
  });
  return invoiceValidationSchema.validate(invoice);
};

module.exports = {
  Invoice,
  validateInvoice,
};
