const Post = require("../models/post");
const User = require("../models/user");
const validator = require("validator");

exports.get_new_post = (req, res) =>
  res.render("new_post.ejs", { url: "new_post" });

exports.post_new_post = async (req, res) => {
  try {
    const title = req.body?.title.trim();
    const body = req.body?.body.trim();
    const user = req.user;

    if (!title || !body)
      return res.render("error.ejs", {
        message: "Please don't submit an empty title or body",
      });

    if (body.length < 500)
      return res.render("error.ejs", {
        message: "Please use at least 500 characters in your body!",
      });

    const post = new Post({ title, body, author: user._id });

    await post.save();

    res.render("post.ejs", {
      post: { ...post._doc, author: user },
      url: "post",
    });
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.get_delete_post = async (req, res) => {
  try {
    const id = req.params.id;

    if (!validator.isMongoId(id))
      return res.render("error.ejs", {
        message: "Post not found! it may have been deleted already",
      });

    await Post.findByIdAndDelete(id);

    res.redirect("/home/1");
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.get_edit_post = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post)
      return res.render("error.ejs", {
        message: "Post not found!",
      });

    res.render("edit_post.ejs", {
      title: post.title,
      body: post.body,
      id,
      url: "edit_post",
    });
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.post_edit_post = async (req, res) => {
  try {
    const title = req.body?.title.trim();
    const body = req.body?.body.trim();

    if (!title || !body)
      return res.render("error.ejs", {
        message: "Please don't submit empty fields!",
      });

    const id = req.params.id
    const post = await Post.findById(id);

    if (!post)
      return res.render("error.ejs", {
        message: "Post not found! it may have been deleted",
      });

    post.title = title;
    post.body = body;

    await post.save();

    res.redirect(`/post/${post._id.toString()}`);
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};

exports.get_post = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    let post;

    post = await Post.findById(id);

    if (!post)
      return res.render("error.ejs", {
        message: "Post not found!",
      });

    const isOwnPost = user?._id.toString() === post.author.toString();

    if (user && (user.level !== "basic" || isOwnPost)) {
      const author = await User.findById(post.author);

      post = { ...post._doc, author, isOwnPost };
    } else {
      post = { title: post.title, body: post.body };
    }

    res.render("post.ejs", {
      post,
      url: "post",
    });
  } catch (error) {
    console.log(error);

    res.render("error.ejs");
  }
};
