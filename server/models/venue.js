import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const venueSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: "Title is required",
			max: 42,
		},
		content: {
			type: String,
			required: "Content is required",
			min: 200,
			max: 200000,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		postedBy: {
			type: ObjectId,
			ref: "User",
		},
		price: {
			type: Number,
			required: "Price is required",
			trim: true,
			max: 1000000,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		from: {
			type: Date,
			required: "Date is required",
		},
		to: {
			type: Date,
			required: "Date is required",
		},
		people: {
			type: Number,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

// slugify the title
venueSchema.pre("validate", function (next) {
	if (this.title) {
		this.slug = slugify(this.title);
	}
	next();
});

export default mongoose.model("Venue", venueSchema);
