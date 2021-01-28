import express from "express";
import { getPersonalInfo } from "../controllers";

const router = express.Router();

router.all("/", getPersonalInfo);

module.exports = router;
