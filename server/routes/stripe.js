import express from "express";
const router = express.Router();

// Middleware
import { requireSignin } from "../middleware/index.js";

// Controllers
import {
	registerConnectAccount,
	getAccountStatus,
} from "../controllers/stripe.js";

router.post("/connect-register", requireSignin, registerConnectAccount);

router.post("/get-account-status", requireSignin, getAccountStatus);

module.exports = router;
