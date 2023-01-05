import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";

const morgan = require("morgan");

require("dotenv").config();

const app = express();

// middlewear
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// connect to db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connected"))
	.catch((err) => console.log("DB Error => ", err));

// route middlewear
fs.readdirSync("./routes").forEach((file) =>
	app.use("/api", require(`./routes/${file}`))
);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log("Server is running on port 3000");
});
