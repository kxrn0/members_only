const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");

router.get("/new-post", controller.get_new_post);

router.post("/new-post", controller.post_new_post);

router.get("/delete/:id", controller.get_delete_post);

router.get("/edit/:id", controller.get_edit_post);

router.post("/edit/:id", controller.post_edit_post);

router.get("/:id", controller.get_post);

module.exports = router;
