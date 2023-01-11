import express from "express";
const router = express.Router();

// Middleware
import { requireSignin } from "../middleware/index.js";

// Controllers
import { registerConnectAccount } from "../controllers/stripe.js";

router.post("/connect-register", requireSignin, registerConnectAccount);

module.exports = router;
