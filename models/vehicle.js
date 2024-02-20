const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  make: {
    required: true,
    type: String,
    trim: true,
  },
  model: {
    required: true,
    type: String,
    trim: true,
  },
  connector: {
    required: true,
    type: Number,
    validate: {
      validator: (value) => {
        return value > 0 && value <= 5;
      },
      message: "Invalid value for connector",
    },
  },
  reg_no: {
    required: true,
    type: String,
    trim: true,
  },
  
});

module.exports = {
    vehicleSchema: vehicleSchema
  };