const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    identityVerified: {
      type: Boolean,
      default: false,
    },
    timeZone: {
      type: String,
      default: "UTC",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Professional", professionalSchema);
