import User from "../models/user.js";

export const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// validation
	if (!firstName) return res.status(400).send("First name is required");
	if (!lastName) return res.status(400).send("Last name is required");
	if (!password || password.length < 6)
		return res
			.status(400)
			.send("Password is required and should be min 6 characters long");
	// check for valid email pattern
	let userPattern = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
	if (!email || !email.match(userPattern))
		return res.status(400).send("Email is required");

	// check if user with that email exists
	let userExist;
	try {
		userExist = await User.findOne({
			email: email.toLowerCase(),
		}).exec();
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again.");
	}

	if (userExist) return res.status(400).send("Email is taken");

	// register
	const user = new User(req.body);

	try {
		await user.save();
		console.log("USER CREATED", user);
		return res.json({ ok: true });
	} catch (err) {
		console.log("CREATE USER FAILED", err);
		return res.status(400).send("Error. Try again.");
	}
};
