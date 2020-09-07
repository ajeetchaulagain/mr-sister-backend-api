const { Router } = require("express");
const { validateItem } = require("../models/item");
const { Supplier } = require("../models/supplier");

const router = Router();

router.post("/:supplierEmail", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const supplier = await Supplier.findOne({
      email: req.params.supplierEmail,
    });

    if (!supplier) return res.status(400).send("Given Supplier doesnt exist");

    const { items } = supplier;
    // console.log("Supplier", supplier);
    const item = items.create(req.body);
    items.push(item);

    await supplier.save();
    return res.send(supplier);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:supplierEmail/:itemId", async (req, res) => {
  try {
    const supplier = await Supplier.findOne({
      email: req.params.supplierEmail,
    });
    if (!supplier) return res.status(400).send("Given Supplier doesnt exist");

    const { items } = supplier;
    const item = items.id(req.params.itemId);
    if (!item) return res.status(400).send("Item with given id doesnt exist");

    item.remove();
    await supplier.save();
    return res.send("Item Deleted");
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
