const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  account_balance: { type: Number, required: true },
  account_number: { type: String, required: true },
  registered_date: { type: Date, default: Date.now() },
  userRef: { type: String, default: "" },
});

module.exports = model("user", UserSchema);
