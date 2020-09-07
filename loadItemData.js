const mongoose = require("mongoose");
const { Supplier } = require("./models/supplier");
const { data4: data } = require("./itemData");

const { dbConfig } = require("./config/dbConfig");

const email = data[1].supplierEmail;

const refinedDatas = data.map((dat) => {
  return {
    itemName: dat.itemName,
    unit: dat.unit,
    price: dat.price,
  };
});

console.log("Refined Datas", refinedDatas);

mongoose.connect(dbConfig, {
  useNewUrlParser: true,
});

loadSupplierData = async () => {
  try {
    const supplier = await Supplier.findOne({
      email: email,
    });

    if (!supplier) return console.log("Supplier doesnt exits");

    const { items } = supplier;
    // console.log("Supplier", supplier);
    const item = items.create(refinedDatas[0]);
    items.push(item);
    await supplier.save();
    console.log("Data successfully added,");
  } catch (e) {
    console.log("Error adding data");
  }
};

loadSupplierData();
