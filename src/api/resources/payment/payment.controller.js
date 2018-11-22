import crypto from "crypto";
import PaymentModel from "./payment.model";
import InvoiceModel from "../invoice/invoice.model";
import * as mailer from "../../modules/mailer";
import generateController from "../../modules/generateController";
import Transfer from "../../modules/transfer";

const Sentry = require("@sentry/node");

const secret = process.env.PAYSTACK_SECRET;

export default generateController(PaymentModel, {
	createOne: (req, res) => {
		const hash = crypto
			.createHmac("sha512", secret)
			.update(JSON.stringify(req.body))
			.digest("hex");
		const {
			event,
			data: { reference, amount, metadata }
		} = req.body;

		if (
			hash === req.headers["x-paystack-signature"] &&
			event === "charge.success"
		) {
			const { referrer } = metadata;
			const invoice_code = referrer.split("/")[4];

			InvoiceModel.findOneAndUpdate(
				{ invoice_code },
				{ status: "paid" },
				{ new: true },
				async (err, doc) => {
					if (err) {
						Sentry.captureException(err);
						return res
							.status(400)
							.send({ error: new Error(err), status: false });
					}

					const {
						_id,
						type,
						whoPaysDeliveryFee,
						customerName,
						customerEmail,
						marchantName,
						marchantEmail,
						marchantBankCode,
						deliveryAmount,
						marchantAccountNumber
					} = doc;

					try {
						await PaymentModel.create({
							customerEmail,
							marchantEmail,
							reference,
							deliveryAmount,
							invoiceId: _id
						});

						res.status(200).send({ success: true });
					} catch (err) {
						Sentry.captureException(err);
						res.status(400).send({
							error: { message: "Could not send mail" },
							success: false
						});
					}
				}
			);
		} else {
			res.status(400).send({ success: false });
		}
	},
	getOne: (req, res) => {
		var id = req.params.invoiceId;
		PaymentModel.findOne({ invoiceId: id }, function(err, doc) {
			if (err) {
				Sentry.captureException(err);
				res.status(401).send({ success: false, error: { ...err } });
			}

			res.status(200).send({ success: true, data: doc });
		});
	}
});
