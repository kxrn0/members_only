const Post = require("../models/post");

exports.get_post = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const omissions = {};
    const populations = [];

    console.log("post");

    if (!user || user.level === "basic") {
      omissions.author = 0;
      omissions.createdAt = 0;
      omissions.upatedAt = 0;
    } else populations.push("author");

    const post = await Post.findById(id, omissions).populate(...populations);

    if (!post) return res.render("error.ejs", { message: "Post not found!" });

    res.render("post.ejs", { post, user, url: "post" });
  } catch (error) {
    console.log(error);
    res.json({ message: "fuck!" });
  }
};
