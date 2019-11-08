const Sentry = require("@sentry/node");

import express from "express";
import InvoiceModel from "../invoice/invoice.model";
import { sendTransefConfirm } from "../../modules/mailer";
import DisputeController from "../dispute/dispute.controller";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const ConfirmRouter = express.Router();

ConfirmRouter.param("invoiceId", DisputeController.getInvoiceId);

ConfirmRouter.route("/:token").get((req, res) => {
	const token = req.params.token;

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			Sentry.captureException(err);
			res
				.status(200)
				.send({ success: false, error: "Token expired or incorrect" });
		}

		const { type, action, customerEmail, invoiceId } = decoded;
		const status = action === "accept" ? "accepted" : "rejected";

		const findInvoice = (err, doc) => {
			if (err || doc === null || doc === undefined) {
				Sentry.captureException(err);
				return res.status(400).send({ success: false, error: err });
			}

			if (status === "rejected") {
				return res
					.status(200)
					.send({ success: true, data: { _id: invoiceId, type, status } });
			}

			if (doc.status === "paid" && doc.type === "good" && status === "accepted") {
				const {
					_id,
					type,
					merchantName,
					merchantUsername,
					userId,
					customerName,
					merchantEmail,
					purchaseAmount,
					pipePayFee,
					deliveryAmount
				} = doc;

				let amount = purchaseAmount;

				if (doc.whoPaysPipepayFee === "seller") {
					amount -= pipePayFee;
				}

				if (doc.whoPaysPipepayFee === "both") {
					amount -= pipePayFee / 2;
				}

				if (doc.whoPaysDeliveryFee === "both") {
					amount += deliveryAmount / 2;
				}

				if (doc.whoPaysDeliveryFee === "seller") {
					amount += deliveryAmount;
				}

				try {
					sendTransefConfirm(
						customerName,
						customerEmail,
						merchantName,
						merchantEmail,
						amount
					);

					InvoiceModel.findOneAndUpdate(
						{ _id: invoiceId },
						{ $set: { status } },
						{ new: true },
						(error, doc) => {
							if (error) {
								Sentry.captureException(err);
								res.status(400).send({ success: false, error });
							}

							res.status(200).send({
								success: true,
								data: { _id: doc._id, type, status }
							});
						});
				} catch (err) {
					Sentry.captureException(err);
					res.status(400).send({ success: false, error: err });
				}
			} else {
				res
					.status(400)
					.send({ success: false, error: "Invoice status cannot be updated!" });
			}
		};

		InvoiceModel.findOne({ _id: invoiceId }, findInvoice);
	});

});

export default ConfirmRouter;