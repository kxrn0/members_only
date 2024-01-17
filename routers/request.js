const express = require("express");
const router = express.Router();
const controller = require("../controllers/request");

router.get("/", controller.get_request);

router.get("/upgrade", controller.get_upgrade_request);

router.get("/aprove/:id", controller.get_aprove_request);

router.get("/reject/:id", controller.get_reject_request);

module.exports = router;
