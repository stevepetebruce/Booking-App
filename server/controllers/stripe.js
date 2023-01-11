import User from "../models/user";
import Stripe from "stripe";

const queryString = require("querystring");

const stripe = Stripe(process.env.STRIPE_SECRET);

export const registerConnectAccount = async (req, res) => {
	console.log(req.auth);
	// find user from db
	const user = await User.findById(req.auth._id).exec();
	console.log("USER => ", user);
	// if user doesnt have stripe_account_id yet, create new
	if (!user.stripe_account_id) {
		const account = await stripe.accounts.create({ type: "express" });
		console.log("ACCOUNT => ", account);
		user.stripe_account_id = account.id;
		user.save();
	}

	// Create login link based on account id (for frontend to complete onboarding)
	let accountLink = await stripe.accountLinks.create({
		account: user.stripe_account_id,
		refresh_url: process.env.STRIPE_REDIRECT_URL,
		return_url: process.env.STRIPE_REDIRECT_URL,
		type: "account_onboarding",
	});

	// Add email to accountLink object
	accountLink = Object.assign(accountLink, {
		"stripe_user[email]": user.email || undefined,
	});

	console.log("ACCOUNT LINK => ", accountLink);

	// construct the link (frontend will use this to complete onboarding)
	let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
	console.log("LOGIN LINK", link);
	res.send(link);

	// update payment schedule (optional)
	// - default is "automatic" (payouts every 2 days)
	// - "manual" is instant payout (no charge)
	// - "daily" is daily payout (1.5% charge)
	// - "weekly" is weekly payout (1.5% charge) etc.
	// const account = await stripe.accounts.update(user.stripe_account_id, {
	// 	settings: {
	// 		payouts: {
	// 			schedule: {
	// 				interval: "manual",
	// 			},
	// 		},
	// 	},
	// });
	// console.log("UPDATE ACCOUNT => ", account);

	res.json({ ok: true });
};
