const express = require("express");
const mongoose = require("mongoose");
const monk = require("monk");
const Joi = require("@hapi/joi");
const db = monk(process.env.MONGO_URI);
const faqs = db.get("faqs");

const router = express.Router();
const databaseUri = process.env.MONGO_URI;

const schema = Joi.object({
	question: Joi.string().trim().required(),
	answer: Joi.string().trim().required(),
	video_url: Joi.string().uri(),
});

mongoose.connect(
	databaseUri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) return console.log(err);
		console.log("Connected to MongoDB");
	}
);

router.get("/", async (req, res, next) => {
	try {
		const items = await faqs.find({});
		res.json(items);
	} catch (error) {
		next(error);
	}
});
router.get("/:id", (req, res, next) => {
	res.json({
		message: "Hi from GET One",
	});
});
// Create One
router.post("/", async (req, res, next) => {
	try {
		console.log(req.body);
		const value = await schema.validateAsync(req.body);
		const inserted = await mongoose.create(value);
		res.send(inserted);
	} catch (error) {
		next(error);
	}
});
router.put("/", (req, res, next) => {
	res.json({
		message: "Hi from UPDATE One",
	});
});
router.delete("/:id", (req, res, next) => {
	res.json({
		message: "Hi from DELETE One",
	});
});

module.exports = router;
