const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");

router.get("/:id", controller.get_post);

module.exports = router;
