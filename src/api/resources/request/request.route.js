import express from "express";
import mongoose from "mongoose";
import InvoiceModel from "../invoice/invoice.model";
import { sendPaymentRequest } from "../../modules/mailer";
import jwt from "jsonwebtoken";
const Sentry = require("@sentry/node");

const JWT_SECRET = process.env.JWT_SECRET;

const Router = express.Router();

Router.route("/:invoiceId").get(async (req, res) => {
	const { invoiceId } = req.params;

	try {
		const {
			_id,
			type,
			customerEmail,
			customerName,
			marchantName,
			status
		} = await InvoiceModel.findOne({ _id: invoiceId });

		const acceptToken = jwt.sign(
			{ invoiceId, type, customerEmail, action: "accept" },
			JWT_SECRET
		);
		const rejectToken = jwt.sign(
			{ invoiceId, type, customerEmail, action: "reject" },
			JWT_SECRET
		);

		if (status === "paid") {
			await sendPaymentRequest(
				type,
				customerEmail,
				customerName,
				marchantName,
				acceptToken,
				rejectToken
			);
			InvoiceModel.findOneAndUpdate(
				{ _id: invoiceId },
				{ $set: { requested: true } },
				(err, doc) => {
					if (err || !doc) {
						Sentry.captureException(err);
						res.status().send({ success: true });
					}
					res.status(200).send({ success: true });
				}
			);
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

Router.route("/:invoiceId/:milestoneId").get(async (req, res) => {
	const { invoiceId, milestoneId } = req.params;

	InvoiceModel.findOne({ _id: invoiceId }, (err, doc) => {
		if (err) {
			Sentry.captureException(err);
			res.status(400).send({ success: false, error: err });
		}

		const {
			_id,
			type,
			milestones,
			customerEmail,
			customerName,
			marchantName,
			status
		} = doc;

		let nextMilestonePaymentIndex;
		let nextMilestonePayment;

		for (let i = 0; i < milestones.length; i++) {
			if (milestones[i]._id == milestoneId) {
				nextMilestonePaymentIndex = i;
				nextMilestonePayment = milestones[i];
				break;
			}
		}

		if (nextMilestonePayment) {
			const acceptToken = jwt.sign(
				{
					milestoneId: nextMilestonePayment._id,
					invoiceId,
					type,
					customerEmail,
					action: "accept"
				},
				JWT_SECRET
			);
			const rejectToken = jwt.sign(
				{
					milestoneId: nextMilestonePayment._id,
					invoiceId,
					type,
					customerEmail,
					action: "reject"
				},
				JWT_SECRET
			);

			if (status === "paid") {
				if (nextMilestonePayment && !nextMilestonePayment.paid) {
					let isLastMilestone =
						nextMilestonePaymentIndex === milestones.length - 1 ? true : false;

					let invoiceUpdate = { requested: false };

					invoiceUpdate["milestones.$[milestone]"] = {
						_id: mongoose.Types.ObjectId(nextMilestonePayment._id),
						requested: true,
						amount: nextMilestonePayment.amount,
						paid: false,
						dueDate: nextMilestonePayment.dueDate,
						description: nextMilestonePayment.description,
						created_at: nextMilestonePayment.created_at,
						updatedAt: new Date()
					};

					if (isLastMilestone) {
						invoiceUpdate.requested = true;
					}

					sendPaymentRequest(
						type,
						customerEmail,
						customerName,
						marchantName,
						acceptToken,
						rejectToken,
						nextMilestonePaymentIndex
					);

					InvoiceModel.findOneAndUpdate(
						{ _id: invoiceId },
						{ $set: invoiceUpdate },
						{
							arrayFilters: [{ "milestone._id": nextMilestonePayment._id }],
							upsert: true,
							new: true
						},
						(err, doc) => {
							if (err || !doc) {
								Sentry.captureException(err);
								res.status().send({ success: false, error: err });
							}

							res.status(200).send({ success: true, data: doc });
						}
					);
				} else {
					res.status(400).send({
						success: false,
						error: { message: "Milestone already paid for" }
					});
				}
			} else {
				res.status(400).send({
					success: false,
					error: { message: "Invoice not paid for yet!" }
				});
			}
		} else {
			res
				.status(400)
				.send({ success: false, error: "Milestone id is not valid" });
		}
	});
});

export default Router;
