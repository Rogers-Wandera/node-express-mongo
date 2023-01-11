const express = require("express");
const path = require("path");

const router = express.Router();

router.get("^/$|/index(.html)?", (req,res) => {
    res.sendFile(path.join(__dirname,"..","pages","index.html"));
})

router.get("/about(.html)?",(req,res) => {
    res.sendFile(path.join(__dirname,"..","pages","about.html"))
})

module.exports = router;