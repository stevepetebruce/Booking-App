import { expressjwt } from "express-jwt";

import Venue from "../models/venue.js";

export const requireSignin = expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
});

export const venueCreator = async (req, res, next) => {
	const { id } = req.params;
	const venue = await Venue.findById(id).exec();
	if (!venue) return res.status(400).send("Venue not found");
	let authorized = venue.postedBy._id.toString() === req.auth._id.toString();
	if (!authorized) return res.status(400).send("You are not authorized");
	next();
};
