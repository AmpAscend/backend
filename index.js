
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const authRouter = require("./routes/auth");
const vehicleRouter = require("./routes/vehicles");
const homeRouter = require("./routes/homes");



const PORT = process.env.PORT;
const app = express();
const DB = process.env.DB_URL;


app.use(express.json());
app.use(authRouter);
app.use(vehicleRouter);
app.use(homeRouter);


mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});