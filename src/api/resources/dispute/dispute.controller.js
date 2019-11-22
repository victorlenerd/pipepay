import DisputeModel from "./dispute.model";
import InvoiceModel from "../invoice/invoice.model";
import generateController from "../../modules/generateController";
import {
	internalPipePayDisputeMail,
	sellerDisputeToBuyerMail,
	buyerDisputeToSellerMail
} from "../../modules/mail-templates/disputes"
import { sendTo } from "../../modules/mailer";
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
						return res.status(400).send({ success: false, error: err });
					}
					try {
						const { from, disputeType, reason } = body;
						const { _id, customerEmail, customerName, merchantEmail, merchantName } = req.invoice;

						sendTo({
							to: "disputes@pipepay.co",
							subject: "New Dispute From A "+from,
							text: internalPipePayDisputeMail(customerName, customerEmail, disputeType, _id, merchantName, merchantEmail, reason)
						});

						if (from === "customer") {
							sendTo({
								to: merchantEmail,
								subject: "New Dispute From "+customerName,
								text: buyerDisputeToSellerMail(merchantName, customerName)
							});
						} else {
							sendTo({
								to:
								customerEmail,
								subject: "New Dispute From "+merchantName,
								text: sellerDisputeToBuyerMail(customerName, merchantName)
							});
						}

						return res.send({ success: true });
					} catch (err) {
						Sentry.captureException(err);
						return res.status(400).send({ error: err.message, success: false });
					}
				}
			);
		} else {
			return res.status(400).send({
				success: false,
				error: {
					message: "Invoice has not being paid for"
				}
			});
		}
	}
});

export default DisputeController;
