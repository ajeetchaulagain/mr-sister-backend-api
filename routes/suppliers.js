const { Router } = require("express");
const { Supplier, validateSupplier } = require("../models/supplier");

const router = Router();

router.get("/", async (req, res) => {
  console.log("Get Route");
  try {
    const supplier = await Supplier.find({});
    return res.send(supplier);
  } catch (e) {
    return res.status(500).send("Internal Server");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateSupplier(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, address, phoneNo, expectedDelivery } = req.body;
  let supplier = Supplier.findOne({ email: req.body.email });
  if (!supplier) return res.status(400).send("Supplier Email already exist");

  supplier = new Supplier({
    name,
    email,
    address,
    phoneNo,
    expectedDelivery,
  });

  try {
    await supplier.save();
    return res.send(supplier);
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  const { error } = validateSupplier(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, address, phoneNo, expectedDelivery, status } = req.body;
  const supplier = await Supplier.findOne({ email: req.body.email });
  console.log("supplier-", supplier);
  if (!supplier) return res.status(400).send("Supplier doesn't exist");

  supplier.name = name;
  supplier.email = email;
  supplier.address = address;
  supplier.phoneNo = phoneNo;
  supplier.expectedDelivery = expectedDelivery;
  supplier.status = status;

  console.log("Supplier Data from POSTMAN-", supplier);
  try {
    await supplier.save();
    return res.send(supplier);
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndRemove(req.params.id);
    if (!supplier) return res.status(400).send("Given Supplier Doesnt Exist");
    return res.send(supplier);
  } catch (e) {
    console.log("Error Deleting supplier");
    return res.status(500).send("Internal Server Error");
  }
  // const supplier = await
});

module.exports = router;
