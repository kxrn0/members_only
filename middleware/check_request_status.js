const Request = require("../models/request");
const User = require("../models/user");

module.exports = async function check_request_status(req, res, next) {
  try {
    const user = req.user;

    if (!user) return next();

    let isPending;

    if (user.level === "admin")
      isPending = await Request.findOne({ status: "pending" });
    else
      isPending = await Request.findOne({
        isRead: false,
        requester: user._id,
      });

    req.isPending = !!isPending;
    next();
  } catch (error) {
    console.log(error);
  }
};
