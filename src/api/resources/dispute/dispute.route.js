import express from "express";
import DisputeController from "./dispute.controller";
const Router = express.Router();

Router.param("invoiceId", DisputeController.getInvoiceId);

Router.route("/:invoiceId").post(DisputeController.createOne);

export default Router;
