import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// validation
		if (!firstName) return res.status(400).send("First name is required");
		if (!lastName) return res.status(400).send("Last name is required");
		if (!password || password.length < 6)
			return res
				.status(400)
				.send(
					"Password is required and should be min 6 characters long"
				);
		// check for valid email pattern
		let userPattern = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
		if (!email || !email.match(userPattern))
			return res.status(400).send("Email is required");

		// check if user with that email exists

		let userExist = await User.findOne({
			email: email.toLowerCase(),
		}).exec();

		if (userExist) return res.status(400).send("Email is taken");

		// register
		const user = new User(req.body);

		await user.save();
		console.log("USER CREATED", user);
		return res.json({ ok: true });
	} catch (err) {
		console.log("CREATE USER FAILED", err);
		return res.status(400).send("Error. Try again.");
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// check if user with that email exists
		let user = await User.findOne({
			email: email.toLowerCase(),
		}).exec();

		if (!user)
			return res.status(400).send("User with that email not found");

		// compare password
		user.comparePassword(password, (err, match) => {
			console.log("COMPARE PASSWORD IN LOGIN ERR", err);
			if (!match || err) return res.status(400).send("Wrong password");

			// generate token and send to client
			let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});

			res.json({
				token,
				user: {
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					role: user.role,
					stripe_account_id: user.stripe_account_id,
					stripe_seller: user.stripe_seller,
					stripeSession: user.stripeSession,
				},
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(400).send("Login failed. Try again.");
	}
};
