import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Middleware
import { requireSignin } from "../middleware/index.js";

// Controllers
import { create, listAll } from "../controllers/venue.js";

router.post("/create-venue", requireSignin, formidable(), create);

router.get("/venues", listAll);

module.exports = router;
