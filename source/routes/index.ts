import express from "express";

import { getPersonalInfo, validateRule } from "../controllers";
import validator from "../middlewares/validator";

const router = express.Router();

router.all("/", getPersonalInfo);
router.post("/validate-rule", validator, validateRule);

export default router;
