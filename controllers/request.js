const Request = require("../models/request");
const User = require("../models/user");

exports.get_request = async (req, res) => {
  try {
    const user = req.user;

    if (user.level === "admin") {
      const requests = await Request.find({ status: "pending" }).populate(
        "requester"
      );

      res.render("admin_request.ejs", { requests });
    } else {
      const unreadAndAnswered = await Request.findOne({
        isRead: false,
        status: { $in: ["fulfilled", "denied"] },
        requester: user._id,
      });
      const unanswered = await Request.findOne({
        status: "pending",
        requester: user._id,
      });
      const previous = await Request.find({
        isRead: true,
        status: { $in: ["fulfilled", "denied"] },
        requester: user._id,
      });

      if (unreadAndAnswered) {
        unreadAndAnswered.isRead = true;

        await unreadAndAnswered.save();
      }

      res.render("user_request.ejs", {
        unreadAndAnswered,
        unanswered,
        previous,
      });
    }
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.get_upgrade_request = async (req, res) => {
  try {
    const user = req.user;
    const type = req.user.level === "basic" ? "basic => pro" : "pro => admin";
    const request = new Request({ type, requester: user._id });

    await request.save();

    res.redirect("/request");
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.get_aprove_request = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Request.findById(requestId);
    const requester = await User.findById(request.requester);

    if (!request || !requester)
      return res.render("error.ejs", {
        message: "Request or requester not found!",
      });

    request.status = "fulfilled";
    request.isRead = false;
    requester.level = requester.level === "basic" ? "pro" : "admin";

    await request.save();
    await requester.save();

    res.redirect("/request");
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.get_reject_request = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);

    request.status = "denied";
    request.isRead = false;

    await request.save();

    res.redirect("/request");
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};
