const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fullName: String,
    phone: String,
    address: String,
    pinCode: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Adress", addressSchema);
