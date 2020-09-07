const mongoose = require("mongoose");
const { Supplier } = require("./models/supplier");
const { datas } = require("./supplierData");

const { dbConfig } = require("./config/dbConfig");

const refinedDatas = datas.map((data) => {
  return {
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
    email: data.email.toLowerCase(),
    address:
      data.address.charAt(0).toUpperCase() +
      data.address.slice(1).toLowerCase(),
    phoneNo: data.phoneNo,
    expectedDelivery: data.expectedDelivery,
  };
});

console.log("Refined Datas", refinedDatas);

mongoose.connect(dbConfig, {
  useNewUrlParser: true,
});

loadSupplierData = async () => {
  try {
    await Supplier.insertMany(refinedDatas);
    console.log("Supplier Added Succesffully");
  } catch (e) {
    console.log("Error saving supplier", e.message);
  }
};

loadSupplierData();
