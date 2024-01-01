const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: String, enum: ["basic", "pro", "adanced"], required: true },
});

module.exports = mongoose.model("User", userSchema);
