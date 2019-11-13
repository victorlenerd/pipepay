import express from "express";
import SellerController from "./seller.controller";

const SellerRouter = express.Router();

SellerRouter.route("/")
	.get(SellerController.getAll)
	.post(SellerController.createOne);

SellerRouter.route("/:user_id")
	.get(SellerController.getOne)
	.delete(SellerController.deleteOne)
	.put(SellerController.updateOne);

export default SellerRouter;
