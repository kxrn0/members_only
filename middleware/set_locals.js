module.exports = function (req, res, next) {
  res.locals = {
    message: "Something went wrong!",
    user: req.user,
    url: "error",
    isPending: req.isPending,
  };

  next();
};
