import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: "Name is required",
			max: 22,
		},
		lastName: {
			type: String,
			trim: true,
			required: "Name is required",
			max: 22,
		},
		email: {
			type: String,
			trim: true,
			required: "Email is required",
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: "Password is required",
			min: 6,
			max: 64,
		},
		role: {
			type: String,
			default: "user",
		},
		stripe_account_id: "",
		stripe_seller: {},
		stripeSession: {},
	},
	{ timestamps: true }
);

// Hash password before saving to db
userSchema.pre("save", function (next) {
	let user = this;
	// Only if the password is modified (i.e. not on update)
	if (user.isModified("password")) {
		return bcrypt.hash(user.password, 12, function (err, hash) {
			if (err) {
				console.log("BCRYPT HASH ERR", err);
				return next(err);
			}
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});

// Compare password in db with password in req.body (login)
userSchema.methods.comparePassword = function (password, next) {
	bcrypt.compare(password, this.password, function (err, match) {
		if (err) {
			console.log("COMPARE PASSWORD ERR", err);
			return next(err, false);
		}
		console.log("MATCH PASSWORD", match);
		return next(null, match); // true (match)
	});
};

export default mongoose.model("User", userSchema);
