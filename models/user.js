const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 55,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const userValidationSchema = Joi.object({
    firstName: Joi.string().required().max(15),
    lastName: Joi.string().required().max(15),
    email: Joi.string().required().email(),
    role: Joi.string().required(),
    password: Joi.string().required().min(5).max(1024),
  });
  return userValidationSchema.validate(user);
};

module.exports = {
  User,
  validateUser,
};
