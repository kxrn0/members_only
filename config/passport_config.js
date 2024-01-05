const User = require("../models/user");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (handle, password, done) => {
      try {
        const user = await User.findOne({ handle });

        if (!user) return done(null, false, { message: "handle not found!" });

        const matches = await bcrypt.compare(password, user.password);

        if (!matches) return done(null, false, { message: "wrong password!" });

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);

      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
