import express from "express";
import WithdrawController from "./withdraw.controller";

const WithdrawRouter = express.Router();

WithdrawRouter.route("/")
	.get(WithdrawController.getAll)
	.post(WithdrawController.createOne);

WithdrawRouter.route("/:withdraw_id")
	.get(WithdrawController.getOne);

export default WithdrawRouter;
