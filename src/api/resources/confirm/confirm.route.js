import express from "express";
import InvoiceModel, { MilestoneSchema } from "../invoice/invoice.model";
import Transfer from "../../modules/transfer";

import DisputeController from "../dispute/dispute.controller";
import InvoiceController from "../invoice/invoice.controller";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const ConfirmRouter = express.Router();

ConfirmRouter.param("invoiceId", DisputeController.getInvoiceId);

ConfirmRouter.route("/:token").get((req, res) => {
	const token = req.params.token;
	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err)
			return res
				.status(200)
				.send({ success: false, error: "Token expired or incorrect" });

		const { type, action, customerEmail, invoiceId } = decoded;
		const status = action === "accept" ? "accepted" : "rejected";

		InvoiceModel.findOne({ _id: invoiceId }, (err, doc) => {
			if (err || doc === null || doc === undefined)
				return res.status(400).send({ success: false, error: err });

			if (status === "rejected") {
				return res
					.status(200)
					.send({ success: true, data: { _id: invoiceId, type, status } });
			}

			if (doc.status === "paid" && doc.type === "good") {
				InvoiceModel.findOneAndUpdate(
					{ _id: invoiceId },
					{ $set: { status } },
					{ new: true },
					async (error, doc) => {
						if (error) return res.status(400).send({ success: false, error });
						const {
							_id,
							type,
							status,
							marchantName,
							marchantAccountNumber,
							marchantBankCode,
							purchaseAmount,
							pipePayFee,
							deliveryAmount
						} = doc;

						if (status === "accepted") {
							try {
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

								await Transfer(
									marchantName,
									marchantAccountNumber,
									marchantBankCode,
									amount
								);
							} catch (err) {
								res.status(400).send({ success: false, error: err });
							}
						}

						res
							.status(200)
							.send({ success: true, data: { _id, type, status } });
					}
				);
			} else if (doc.status === "paid" && doc.type === "service") {
				const milestoneId = decoded.milestoneId;
				let milestone = {};
				let milestoneIndex = -1;
				let milestones = doc.milestones;

				milestones.forEach((m, i) => {
					if (m._id == milestoneId) {
						milestoneIndex = i;
						milestone = m;
					}
				});

				Transfer(
					doc.marchantName,
					doc.marchantAccountNumber,
					doc.marchantBankCode,
					milestone.amount
				)
					.then(() => {
						milestone.paid = true;
						milestone.requested = true;

						milestones[milestoneIndex] = milestone;
						let requested = false;
						let status = "paid";

						if (milestoneIndex === milestones.length - 1) {
							requested = true;
							status = "accepted";
						}

						InvoiceModel.findOneAndUpdate(
							{ _id: invoiceId },
							{ $set: { milestones, requested, status } },
							{ new: true },
							(err, doc) => {
								if (err)
									return res.status(400).send({ success: false, error: err });
								const { _id, type, status } = doc;

								res
									.status(200)
									.send({ success: true, data: { _id, type, status } });
							}
						);
					})
					.catch(() => {
						if (err)
							res
								.status(400)
								.send({ success: false, error: "Failed to make transfer" });
					});
			} else {
				res
					.status(400)
					.send({ success: false, error: "Invoice status cannot be updated!" });
			}
		});
	});
});

export default ConfirmRouter;
