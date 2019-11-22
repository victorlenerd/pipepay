import express from "express";
import InvoiceModel from "../invoice/invoice.model";
import { sendTo } from "../../modules/mailer";
import { sellerFundsTransferRequestMail } from "../../modules/mail-templates/request";
import jwt from "jsonwebtoken";

let origin;

if (process.env.NODE_ENV === "staging") {
	origin = "https://pipepay.africa/confirm";
} else if (process.env.NODE_ENV === "production") {
	origin = "https://pipepay.co/confirm";
} else if (
	process.env.NODE_ENV === "testing" ||
	process.env.NODE_ENV === "development"
) {
	origin = "http://localhost:4545/confirm";
} else {
	origin = "http://localhost:4545/confirm";
}

const Sentry = require("@sentry/node");

const JWT_SECRET = process.env.JWT_SECRET;

const Router = express.Router();

Router.route("/:invoiceId").get(async (req, res) => {
	const { invoiceId } = req.params;

	try {
		const {
			type,
			customerEmail,
			customerName,
			merchantName,
			status
		} = await InvoiceModel.findOne({ _id: invoiceId });

		const acceptToken = jwt.sign({ invoiceId, type, customerEmail, action: "accept" }, JWT_SECRET, { expiresIn: '48h' });
		const rejectToken = jwt.sign({ invoiceId, type, customerEmail, action: "reject" }, JWT_SECRET, { expiresIn: '48h' });

		if (status === "paid") {

			sendTo({
				to: customerEmail,
				subject: "Fund transfer request from "+merchantName,
				html: sellerFundsTransferRequestMail(customerName, merchantName, `${origin}/${acceptToken}`, `${origin}/${rejectToken}`)
			});

			InvoiceModel.findOneAndUpdate({ _id: invoiceId }, { $set: { requested: true } }, (err, doc) => {
					if (err || !doc) {
						Sentry.captureException(err);
						res.status().send({ success: true });
					}
					res.status(200).send({ success: true });
				});
		} else {
			res.status(400).send({
				success: false,
				error: { message: "Invoice not paid for yet!" }
			});
		}
	} catch (err) {
		Sentry.captureException(err);
		if (err) res.status(400).send({ success: false, error: err });
	}
});

export default Router;
