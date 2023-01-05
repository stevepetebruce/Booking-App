import express from "express";
const router = express.Router();

import { register } from "../controllers/auth.js";

router.post("/users/register", register);

module.exports = router;
