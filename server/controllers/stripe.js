import User from "../models/user";
import Stripe from "stripe";

const queryString = require("querystring");

const stripe = Stripe(process.env.STRIPE_SECRET);

// Rgister a new connect account
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
};

// Update stripe payment delay (2 days)
const updateDelayDays = async (accountId) => {
	return await stripe.accounts.update(accountId, {
		settings: {
			payouts: {
				schedule: {
					delay_days: process.env.STRIPE_PAYMENT_DELAY_DAYS,
				},
			},
		},
	});
};

// Get stripe account status based on account id (for frontend to complete onboarding)
export const getAccountStatus = async (req, res) => {
	const user = await User.findById(req.auth._id).exec();

	// get account status from stripe
	const account = await stripe.accounts.retrieve(user.stripe_account_id);
	console.log("USER ACCOUNT RETRIEVE", account);

	// update delay days in stripe account
	const updatedAccount = await updateDelayDays(account.id);
	console.log("USER ACCOUNT DELAY DAYS UPDATED", updatedAccount);

	// update stripe_seller in user db
	const updatedUser = await User.findByIdAndUpdate(
		user._id,
		{
			stripe_seller: updatedAccount,
		},
		{ new: true } // return updated user instead of old user
	)
		.select("-password") // remove password from user object
		.exec(); // execute query

	res.json(updatedUser);
};

// Get stripe account balance (for seller payout)
export const getAccountBalance = async (req, res) => {
	const user = await User.findById(req.auth._id).exec();

	try {
		const balance = await stripe.balance.retrieve({
			stripeAccount: user.stripe_account_id,
		});
		res.json(balance);
	} catch (err) {
		console.log(err);
	}
};

// Payout setting (for seller payout)
export const payoutSetting = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id).exec();

		const loginLink = await stripe.accounts.createLoginLink(
			user.stripe_account_id,
			{
				redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
			}
		);

		res.json(loginLink);
	} catch (err) {
		console.log(err);
	}
};
