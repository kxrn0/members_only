const User = require("../models/user");
const validator = require("validator");
const passport = require("passport");
const bcrypt = require("bcrypt");

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
    const username = req.body?.username.trim();
    const password = req.body?.password.trim();
    const reg = /^\w{1,15}$/i;

    if (!reg.test(username))
      return res.render("error.ejs", {
        ...res.locals.errorConfig,
        message:
          "Please only include alphanumeric characters (a-z, 0-9, _) in your handle!",
      });

    if (!validator.isStrongPassword(password))
      return res.render("error.ejs", {
        ...res.locals.errorConfig,
        message: "Please use a stronger password",
      });

    if (!username || !password)
      return res.render("error.ejs", {
        ...res.locals.errorConfig,
        message: "Please don't leave any field empty!",
      });

    const existing = await User.findOne({ username });

    if (existing)
      return res.render("error.ejs", {
        ...res.locals.errorConfig,
        message: "Please use a different username!",
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hash });

    await user.save();

    res.redirect("/auth/log-in");
  } catch (error) {
    console.log(error);
    
    res.redirect("/error", {
      message: "Something went wrong!",
      ...res.locals.errorConfig,
    });
  }
};

exports.get_log_out = (req, res) =>
  req.logout((error) => {
    if (error)
      return res.render("error.ejs", {
        message: "Something went wrong!",
        ...res.locals.errorConfig,
      });

    res.redirect("/home/1");
  });
