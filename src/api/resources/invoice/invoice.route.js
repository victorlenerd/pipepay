import express from "express";
import InvoiceController from "./invoice.controller";

const InvoiceRouter = express.Router();

InvoiceRouter.param("id", InvoiceController.findByParam);

InvoiceRouter.route("/")
	.get(InvoiceController.getAll)
	.post(InvoiceController.createOne);

InvoiceRouter.route("/:id")
	.get(InvoiceController.getOne)
	.delete(InvoiceController.deleteOne);

export default InvoiceRouter;
