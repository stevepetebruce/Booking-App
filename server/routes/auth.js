import express from "express";
const router = express.Router();

import { register, login } from "../controllers/auth.js";

router.post("/users/register", register);

router.post("/users/login", login);

module.exports = router;
