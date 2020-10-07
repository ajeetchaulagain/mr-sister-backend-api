const { Router } = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const cors = require("cors");

const router = Router();

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(1024),
  });
  return schema.validate(req);
};

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(` ${error.details[0].message}`);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.send(400).send("Invalid email or password");
    const token = user.generateAuthToken();
    return res.send(token);
  } catch (e) {
    return res.status(500).send("Internal Server Error occurred");
  }
});

router.get("/test", (req, res) => {
  return res.send("Hello miteasdfsd hello . from /test route");
});

router.post("/posttest", (req, res) => {
  return res.send("Post request called!!!");
});

module.exports = router;
