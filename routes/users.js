const { Router } = require("express");
const { User, validateUser } = require("../models/user");
const pick = require("../util/pick-object-property");
const bcrypt = require("bcrypt");

const router = Router();

// For getting user information
router.get("/", async (req, res) => {
  console.log("Get Route");
  try {
    const user = await User.find({});
    return res.send(user);
  } catch (e) {
    return res.status(500).send("Internal Server");
  }
});

// For creating a user - staff or admin both
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already exist");

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  console.log("User model", user);

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  } catch (e) {
    console.log("Error creating a user");
    return res.status(500).send("Internal Server Error");
  }

  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .send(pick(user, ["_id", "email", "firstName", "lastName"]));
});

// Deleting users
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(400).send("User Doesn't Exist");
    return res.send(user);
  } catch (e) {
    console.log("Error Deleting user");
    return res.status(500).send("Internal Server Error");
  }
  // const supplier = await
});

module.exports = router;
