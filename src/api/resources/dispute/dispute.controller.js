import DisputeModel from "./dispute.model";
import InvoiceModel from "../invoice/invoice.model";
import generateController from "../../modules/generateController";
import { sendDisputeMail } from "../../modules/mailer";
const Sentry = require("@sentry/node");

const DisputeController = generateController(DisputeModel, {
	getInvoiceId: (req, res, next) => {
		const _id = req.params.invoiceId;

		InvoiceModel.findOne({ _id }, (err, doc) => {
			if (err) {
				Sentry.captureException(err);
				res.status(400).send({
					error: {
						message: "Invoice with id does not exits"
					},
					success: false
				});
			}
			req.invoice = doc;
			next();
		});
	},
	createOne: (req, res) => {
		const body = req.body;
		const { _id, status } = req.invoice;

		body.status = "open";
		body.invoiceId = _id;

		if (status !== "sent" && status !== "accepted") {
			InvoiceModel.findOneAndUpdate({ _id }, { disputed: true,  status: "rejected" },
				async (err, doc) => {
					if (err) {
						Sentry.captureException(err);
						res.status(400).send({
							success: false,
							error: err
						});
					}
					try {
						await sendDisputeMail(
							req.invoice,
							body.disputeType,
							body.reason,
							body.from
						);

						res.send({
							success: true
						});
					} catch (err) {
						Sentry.captureException(err);
						res.status(400).send({
							error: {
								message: "Could not send mail"
							},
							success: false
						});
					}
				}
			);
		} else {
			res.status(400).send({
				success: false,
				error: {
					message: "Invoice has not being paid for"
				}
			});
		}
	}
});

export default DisputeController;
