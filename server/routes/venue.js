import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Middleware
import { requireSignin, venueCreator } from "../middleware/index.js";

// Controllers
import {
	create,
	edit,
	listAll,
	single,
	isBooked,
	singleAdmin,
	image,
	AdminListAll,
	toggleEnabled,
	userBookings,
} from "../controllers/venue.js";

router.post("/create-venue", requireSignin, formidable(), create);

router.get("/venues", listAll);
router.get("/venue/image/:id", image);
router.get("/venue/:slug", single);
router.get("/is-booked/:venueId", requireSignin, isBooked);

router.get("/admin/venue/:id", singleAdmin);
router.get("/admin/venues", requireSignin, AdminListAll);
router.get("/admin/bookings", requireSignin, userBookings);

router.put(
	"/admin/edit-venue/:id",
	requireSignin,
	venueCreator,
	formidable(),
	edit
);

router.put(
	"/admin/venue/enabled/:id",
	requireSignin,
	venueCreator,
	toggleEnabled
);

module.exports = router;
