const express = require("express");
const { auth } = require("../../auth-jwt");
const { joinVideo } = require("../videoControl");

const router = express.Router();

router.get("/join", auth, joinVideo);

module.exports = router;
