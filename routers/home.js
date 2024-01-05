const express = require("express");
const router = express.Router();
const controller = require("../controllers/home");



router.get("/:page?", controller.get_homepage);
