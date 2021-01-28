const express = require("express");
const { getPersonalInfo } = require("../controllers");

const router = express.Router();

router.all("/", getPersonalInfo);

module.exports = router;
