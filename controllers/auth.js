const User = require("../models/user");

exports.get_log_in = (req, res) =>
  res.render("log_in", { url: "log-in", user: null });

exports.get_sign_up = (req, res) =>
  res.render("sign_up", { url: "sign-up", user: null });
