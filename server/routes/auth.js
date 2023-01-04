import express from "express";
const router = express.Router();

import { showMessage } from "../controllers/auth.js";

router.get("/auth", showMessage);

module.exports = router;
