require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passport_config = require("./config/passport_config");
const auth = require("./routers/auth");
const post = require("./routers/post");
const home = require("./routers/home");
const error = require("./routers/error");
const check_request_status = require("./middleware/check_request_status");
const error_config = require("./middleware/error_config");

passport_config(passport);

app.set("views", `${__dirname}/views/`);
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => res.redirect("/home"));
app.use(check_request_status);
app.use(error_config);
app.use("/auth", auth);
app.use("/post", post);
app.use("/home", home);
app.use("/error", error);

mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT || 9999, () =>
      console.log(`listening on ${process.env.PORT || 9999}`)
    );

    console.log("connected to db!");
  })
  .catch((error) => console.log(error));
