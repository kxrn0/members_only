const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/:username/:page?", controller.get_user);

module.exports = router;
