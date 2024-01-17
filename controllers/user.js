const User = require("../models/user");
const Post = require("../models/post");
const get_indices = require("../utilities/get_indices");

exports.get_user = async (req, res) => {
  try {
    const itemsPerPage = 3;
    const username = req.params.username;
    const page = req.params.page ? Number(req.params.page) : 1;
    const skip = (page - 1) * itemsPerPage;
    const author = await User.findOne({ username });
    const posts = (
      await Post.find({ author: author._id })
        .skip(skip)
        .sort({ createdAt: -1 })
        .limit(itemsPerPage)
    ).map((post) => ({
      ...post._doc,
      body: post.body.substring(0, 500),
    }));
    const pagesPerSection = 5;
    const postCount = await Post.countDocuments({ author: author._id });
    const totalPages = Math.ceil(postCount / itemsPerPage);
    const indices = get_indices(totalPages, pagesPerSection, page);

    res.render("user.ejs", {
      posts,
      indices,
      page,
      totalPages,
      url: "user",
      postCount,
      author,
      root: `user/${username}`,
    });
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};
