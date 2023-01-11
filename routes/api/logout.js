const express = require("express");
const { handleLogOut } = require("../../controllers/logout");


const router = express.Router();

router.route("/").get(handleLogOut)

module.exports = router;
