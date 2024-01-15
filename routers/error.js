const express = require("express");
const router = express.Router();
const controller = require("../controllers/error");

router.get("/", controller.get_error);

module.exports = router;
