import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Middleware
import { requireSignin } from "../middleware/index.js";

// Controllers
import { create, listAll, image } from "../controllers/venue.js";

router.post("/create-venue", requireSignin, formidable(), create);

router.get("/venues", listAll);
router.get("/venue/image/:id", image);

module.exports = router;
