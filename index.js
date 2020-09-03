const express = require("express");
const mongoose = require("mongoose");
const { dbConfig } = require("./config/dbConfig");
const cors = require("cors");

const app = express();

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(cors());

// Initializing Database
mongoose.connect(dbConfig, {
  useNewUrlParser: true,
});

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.listen(4000, () => {
  console.log("App is listening at port 4000");
});
