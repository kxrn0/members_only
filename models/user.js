const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: String, enum: ["basic", "pro", "admin"], default: "basic" },
});

module.exports = mongoose.model("User", userSchema);
