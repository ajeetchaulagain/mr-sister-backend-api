const express = require("express");
const mongoose = require("mongoose");
const { dbConfig } = require("./config/dbConfig");
const cors = require("cors");

const app = express();

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const suppliersRoute = require("./routes/suppliers");
const itemsRoute = require("./routes/items");
const invoicesRoute = require("./routes/invoices");

app.use(express.json());
app.use(cors());

// Initializing Database
mongoose.connect(dbConfig, {
  useNewUrlParser: true,
});

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/suppliers", suppliersRoute);
app.use("/api/items", itemsRoute);
app.use("/api/invoices", invoicesRoute);

app.get("/test", (req, res) => {
  res.send("Hello there. I am checking route");
});

app.listen(4000, () => {
  console.log("App is listening at port 4000");
});
