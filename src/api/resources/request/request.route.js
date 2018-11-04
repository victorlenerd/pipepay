import express from "express";
import InvoiceModel from "../invoice/invoice.model";
import { sendPaymentRequest } from "../../modules/mailer";
import jwt from "jsonwebtoken";

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
			JWT_SECRET,
			{ expiresIn: "24h" }
		);
		const rejectToken = jwt.sign(
			{ invoiceId, type, customerEmail, action: "reject" },
			JWT_SECRET,
			{ expiresIn: "24h" }
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
					if (err || !doc) res.status().send({ success: true });
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
		if (err) res.status(400).send({ success: false, error: err });
	}
});

Router.route("/:invoiceId/:milestoneId").get(async (req, res) => {
	const { invoiceId, milestoneId } = req.params;

	try {
		const {
			_id,
			type,
			milestones,
			customerEmail,
			customerName,
			marchantName,
			status
		} = await InvoiceModel.findOne({ _id: invoiceId });

		// const [ milestone ] = milestones.filter(({ _id }) => _id !== milestoneId);

		let nextMilestonePaymentIndex;
		let nextMilestonePayment;

		for (let i = 0; i < milestones.length; i++) {
			if (!milestones[i]._id === milestoneId) {
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
				JWT_SECRET,
				{ expiresIn: "24h" }
			);
			const rejectToken = jwt.sign(
				{
					milestoneId: nextMilestonePayment._id,
					invoiceId,
					type,
					customerEmail,
					action: "reject"
				},
				JWT_SECRET,
				{ expiresIn: "24h" }
			);

			if (status === "paid") {
				if (nextMilestonePayment && !nextMilestonePayment.paid) {
					let isLastMilestone =
						nextMilestonePaymentIndex === milestones.length - 1 ? true : false;
					let updatedMilestone = Object.assign({}, nextMilestonePayment, {
						requested: true
					});
					milestones[nextMilestonePaymentIndex] = updatedMilestone;

					let invoiceUpate = { milestones, requested: false };

					if (isLastMilestone) invoiceUpate.requested = true;

					await sendPaymentRequest(
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
						{ $set: invoiceUpate },
						(err, doc) => {
							if (err || !doc) res.status().send({ success: true });
							res.status(200).send({ success: true });
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
			return res
				.status(400)
				.send({ success: false, error: "Milestone id is not valid" });
		}
	} catch (err) {
		if (err) res.status(400).send({ success: false, error: err });
	}
});

export default Router;
