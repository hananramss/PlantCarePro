const mongoose = require("mongoose");

const moistureSchema = new mongoose.Schema({
  timestamp: {
      type: Date,
      default: () => new Date(),
  },
  moisture_level: Number,
});

const moistureLevel = mongoose.model("moistureLevel", moistureSchema, "moisture_level");

module.exports = moistureLevel;