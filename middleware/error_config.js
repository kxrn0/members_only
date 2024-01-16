module.exports = function (req, res, next) {
  res.locals = {
    user: req.user,
    url: "error",
    isPending: req.isPending,
  };

  next();
};
