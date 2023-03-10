import express from "express";
const router = express.Router();

// Middleware
import { requireSignin } from "../middleware/index.js";

// Controllers
import {
	registerConnectAccount,
	getAccountStatus,
	getAccountBalance,
	payoutSetting,
	createCheckoutSession,
	stripeSuccess,
} from "../controllers/stripe.js";

router.post("/connect-register", requireSignin, registerConnectAccount);

router.post("/get-account-status", requireSignin, getAccountStatus);

router.post("/get-account-balance", requireSignin, getAccountBalance);

router.post("/payout-setting", requireSignin, payoutSetting);

router.post("/create-checkout-session", requireSignin, createCheckoutSession);

// order
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
