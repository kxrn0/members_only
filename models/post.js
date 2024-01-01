const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: { type: String, reqired: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
