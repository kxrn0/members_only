const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.get("/log-in", controller.get_log_in);

router.get("/sign-up", controller.get_sign_up);

module.exports = router;
