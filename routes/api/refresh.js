const express = require("express");
const { handleRefresh } = require("../../controllers/refreshToken");


const router = express.Router();

router.route("/").get(handleRefresh)

module.exports = router;
