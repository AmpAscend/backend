const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },

  provider: {
    required: true,
    type: Number,
    validate: {
      validator: (value) => {
        return value > 0 && value <= 3;
      },
      message: "Invalid value for provider",
    },
  },
  panels: {
    required: true,
    type: Number,
    trim: true,
  },
  
});

module.exports = {
    homeSchema: homeSchema
  };