const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  street: { type: String, required: true },
  postcode: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10,15}$/,
  },
  customer_number: { type: Number, unique: true, required: true },
});

module.exports = mongoose.model("Address", addressSchema);
