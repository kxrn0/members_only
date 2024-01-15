const Post = require("../models/post");
const get_indices = require("../utilities/get_indices");

exports.get_homepage = async (req, res) => {
  try {
    const user = req.user;
    const omissions = {};
    const populations = [];

    if (!user || user.level === "basic") {
      omissions.author = 0;
      omissions.createdAt = 0;
      omissions.updatedAt = 0;
    } else populations.push("author");

    const itemsPerPage = 3;
    const page = (req.params.page && Number(req.params.page)) || 1;
    const skip = (page - 1) * itemsPerPage;
    const posts = await Post.find({}, omissions)
      .skip(skip)
      .populate(...populations)
      .sort({ createdAt: -1 })
      .limit(itemsPerPage);
    const pagesPerSection = 5;
    const postCount = await Post.countDocuments();
    const totalPages = Math.ceil(postCount / itemsPerPage);
    const indices = get_indices(totalPages, pagesPerSection, page);

    res.render("home.ejs", {
      posts,
      user,
      indices,
      page,
      totalPages,
      url: "home",
      isPending: req.isPending,
    });
  } catch (error) {
    console.log(error);
  }
};
