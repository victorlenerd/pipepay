import express from "express";
import CategoryModel from "./categories.model";

const Router = express.Router();

Router.route("/")
	.get(async (req, res) => {
		const categories = await CategoryModel.find({});
		res.status(200).json({  categories });
	});

export default Router;
