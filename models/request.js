const mongoose = require("mongoose");
const requestSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["fulfilled", "pending", "denied"],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["basic => pro", "pro => admin"],
    required: true,
  },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Request", requestSchema);
