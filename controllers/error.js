exports.get_error = (req, res) =>
  res.render("error.ejs", {
    message: "Something went wrong!",
    user: null,
    url: "error",
  });
