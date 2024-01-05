const Post = require("../models/post");

exports.get_homepage = async (req, res) => {
  const itemsPerPage = 10;
  const posts = await Post.find({}).sort({ createdAt: -1 }).limit(itemsPerPage);
};
