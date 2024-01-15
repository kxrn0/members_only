const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.get_log_in = (req, res) =>
  res.render("log_in", { url: "log-in", user: null });

exports.post_log_in = passport.authenticate("local", {
  successRedirect: "/home/1",
  failureRedirect: "/error",
});

exports.get_sign_up = (req, res) =>
  res.render("sign_up", { url: "sign-up", user: null });

exports.post_sign_up = async (req, res) => {
  try {
    const name = req.body?.name.trim();
    const handle = req.body?.handle.trim();
    const password = req.body?.password.trim();
    const reg = /^\w{1,15}$/i;
    const errorConfig = { user: null, url: "error" };

    if (!reg.test(handle))
      return res.render("error.ejs", {
        ...errorConfig,
        message:
          "Please only include alphanumeric characters (a-z, 0-9, _) in your handle!",
      });

    if (!validator.isStrongPassword(password))
      return res.render("error.ejs", {
        ...errorConfig,
        message: "Please use a stronger password",
      });

    if (!name || !handle || !password)
      return res.render("error.ejs", {
        ...errorConfig,
        message: "Please don't leave any field empty!",
      });

    const existing = await User.findOne({ handle });

    if (existing)
      return res.render("error.ejs", {
        ...errorConfig,
        message: "Please use a different handle!",
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, handle, password: hash });

    await user.save();

    res.redirect("/auth/log-in");
  } catch (error) {}
};
