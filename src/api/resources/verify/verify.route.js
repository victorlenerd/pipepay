import express from "express";
import DisputeController from "../dispute/dispute.controller";
import { sendCustormerVerificationCode } from "../../modules/mailer";
const Sentry = require("@sentry/node");

const Router = express.Router();

Router.param("invoiceId", DisputeController.getInvoiceId);

Router.route("/:invoiceId").get(async (req, res) => {
	const { customerEmail, verifyCode } = req.invoice;

	try {
		console.log('Sending mail');
		await sendCustormerVerificationCode(customerEmail, verifyCode);
		res.send({ success: true });
	} catch (error) {
		Sentry.captureException(error);
		res.status(400).send({ status: false, error });
	}
});

export default Router;
