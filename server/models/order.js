// Schema to store each order

import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
	{
		venue: {
			type: ObjectId,
			ref: "Venue",
		},
		// Session taken from users session and stored in the order then deleted from the user.session
		session: {},

		// Who ordered
		orderedBy: {
			type: ObjectId,
			ref: "User",
		},
		// Who sold
		soldBy: {
			type: ObjectId,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);
