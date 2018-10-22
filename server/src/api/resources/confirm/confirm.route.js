import express from "express";
import InvoiceModel, { MilestoneSchema } from "../invoice/invoice.model";
import Transfer from "../../modules/transfer";
import DisputeController from "../dispute/dispute.controller";

const ConfirmRouter = express.Router();

ConfirmRouter.param("invoiceId", DisputeController.getInvoiceId);

ConfirmRouter.route("/:invoiceId").post((req, res) => {
	const invoiceId = req.params.invoiceId;
	const status = req.body.accepted ? "accepted" : "rejected";
	const emailCode = req.body.emailCode;

	if (req.invoice.verifyCode !== emailCode)
		return res
			.status(400)
			.send({ success: false, error: new Error("Wrong invoice code") });

	InvoiceModel.findOneAndUpdate(
		{ _id: invoiceId },
		{ $set: { status } },
		{ new: true },
		async (error, doc) => {
			if (error) res.status(400).send({ success: false, error });
			const {
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
						amount -= deliveryAmount;
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

			res.status(200).send({ success: true, data: doc });
		}
	);
});

ConfirmRouter.route("/:invoiceId/:milestoneId").post(async (req, res) => {
	const invoiceId = req.params.invoiceId;
	const milestoneId = req.params.milestoneId;

	const status = req.body.accepted ? "accepted" : "rejected";
	const emailCode = req.body.emailCode;

	if (req.invoice.verifyCode !== emailCode)
		return res
			.status(400)
			.send({ success: false, error: new Error("Wrong invoice code") });
	try {
		const {
			marchantName,
			marchantAccountNumber,
			marchantBankCode,
			milestones
		} = await InvoiceModel.findOne({ _id: invoiceId });
		let milestone = {};
		let milestoneIndex = -1;

		milestones.forEach((m, i) => {
			if (m._id == milestoneId) {
				milestoneIndex = i;
				milestone = m;
			}
		});

		await Transfer(
			marchantName,
			marchantAccountNumber,
			marchantBankCode,
			milestone.amount
		);
		milestone.paid = true;
		milestones[milestoneIndex] = milestone;
		InvoiceModel.findOneAndUpdate(
			{ _id: invoiceId },
			{ $set: { milestones } },
			{ new: true },
			(err, doc) => {
				if (err) res.status(400).send({ success: false, error: err });
				res.status(200).send({ success: true, data: doc });
			}
		);
	} catch (err) {
		res.status(400).send({ success: false, error: err });
	}
});

export default ConfirmRouter;
