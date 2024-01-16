const Post = require("../models/post");
const User = require("../models/user");

exports.get_new_post = (req, res) =>
  res.render("new_post.ejs", {
    user: req.user,
    url: "new_post",
    isPending: req.isPending,
  });

exports.post_new_post = async (req, res) => {
  try {
    const title = req.body?.title.trim();
    const body = req.body?.body.trim();
    const user = req.user;

    if (!title || !body)
      return res.render("error.ejs", {
        message: "Please don't submit an empty title or body",
        ...res.locals.errorConfig,
      });

    if (body.length < 500)
      return res.render("error.ejs", {
        message: "Please use at least 500 characters in your body!",
        ...res.locals.errorConfig,
      });

    const post = new Post({ title, body, author: user._id });

    await post.save();

    res.render("post.ejs", {
      post: { ...post._doc, author: user },
      user,
      url: "post",
      isPending: req.isPending,
    });
  } catch (error) {
    console.log(error);

    res.render("error.ejs", {
      message: "Something went wrong!",
      ...res.locals.errorConfig,
    });
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
        ...res.locals.errorConfig,
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
      user,
      url: "post",
      isPending: req.isPending,
    });
  } catch (error) {
    console.log(error);

    res.render("error.ejs", {
      message: "Something went wrong!",
      ...res.locals.errorConfig,
    });
  }
};
