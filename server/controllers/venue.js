import User from "../models/user";
import Venue from "../models/venue";
import Order from "../models/order";

import fs from "fs";

// create venue
export const create = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id).exec();
		console.log("CREATE VENUE FOR USER", user);

		const { title, content, price, state, from, to, people } = req.fields;
		const { image } = req.files;

		if (image && image.size > 10000000) {
			return res
				.status(400)
				.send("Image should be less than 1mb in size");
		}

		let venue = await new Venue({
			title,
			content,
			price,
			state,
			from,
			to,
			people,
			postedBy: user,
		});

		// handle image
		// let uploadResponse = await cloudinary.uploader.upload(image.path, {
		//     public_id: `venues/${uuidv4()}`,
		//     resource_type: "auto", // jpeg, png
		//     folder: "venues",
		// });
		// console.log("CLOUDINARY UPLOAD RESPONSE", uploadResponse);

		if (image) {
			venue.image.data = fs.readFileSync(image.path);
			venue.image.contentType = image.type;
		}

		await venue.save((err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).send(err.message);
			}
			res.json(result);
		});
	} catch (err) {
		console.log("VENUE CREATE ERROR", err.message);
		res.status(400).send("Error. Try again.");
	}
};

export const edit = async (req, res) => {
	console.log("TESTING EDIT VENUE");
	try {
		const { title, content, price, from, to, people } = req.fields;

		let updatedData = {};

		updatedData.title = title;
		updatedData.content = content;
		updatedData.price = price;
		updatedData.from = from;
		updatedData.to = to;
		updatedData.people = people;

		if (req.files.image && req.files.image.size > 10000000) {
			return res
				.status(400)
				.send("Image should be less than 1mb in size");
		}

		if (req.files.image) {
			let image = {};
			image.data = fs.readFileSync(req.files.image.path);
			image.contentType = req.files.image.type;
			updatedData.image = image;
		}

		// update venue
		await Venue.findByIdAndUpdate(req.params.id, updatedData, { new: true })
			.select("-image.data")
			.exec((err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).send(err.message);
				}
				res.json(result);
			});
	} catch (err) {
		console.log("VENUE EDIT ERROR", err.message);
		res.status(400).send("Error. Try again.");
	}
};

export const listAll = async (req, res) => {
	let venues = await Venue.find({})
		.limit(24)
		// enabled field is === true
		.where("enabled")
		.equals("true")
		.select("-image.data")
		.populate("postedBy", " _id firstName lastName")
		.exec();
	res.json(venues);
};

export const image = async (req, res) => {
	let venue = await Venue.findById(req.params.id).exec();
	if (venue && venue.image && venue.image.data !== null) {
		res.set("Content-Type", venue.image.contentType);
		return res.send(venue.image.data);
	}
};

export const single = async (req, res) => {
	console.log(req.params.slug);
	let venue = await Venue.findOne({ slug: req.params.slug })
		.select("-image.data")
		.populate("postedBy", "_id firstName lastName")
		.exec();
	res.json(venue);
};

export const singleAdmin = async (req, res) => {
	console.log(req.params.id);
	let venue = await Venue.findById(req.params.id)
		.populate("postedBy", "_id firstName lastName")
		.exec();
	res.json(venue);
};

export const userBookings = async (req, res) => {
	const allUserBookings = await Order.find({
		orderedBy: req.auth._id,
	})
		.select("session")
		.populate("venue", "-image.data")
		.populate("orderedBy", "_id firstName lastName")
		.exec();

	res.json(allUserBookings);
};

export const AdminListAll = async (req, res) => {
	try {
		// Venues by user
		const venues = await Venue.find({ postedBy: req.auth._id })
			.select("-image.data")
			.populate("postedBy", "_id firstName lastName")
			.exec();
		res.json(venues);
	} catch (err) {
		console.log(err);
	}
};

// Toggle enabled
export const toggleEnabled = async (req, res) => {
	console.log(req.params.id, req.body, req.headers);
	try {
		const venue = await Venue.findById(req.params.id).exec();
		console.log(venue);
		venue.enabled = !venue.enabled;
		await venue.save();
		res.json(venue);
	} catch (err) {
		console.log(err);
	}
};
