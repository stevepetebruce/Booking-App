import User from "../models/user";
import Venue from "../models/venue";

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

export const listAll = async (req, res) => {
	let venues = await Venue.find({})
		.limit(24)
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
