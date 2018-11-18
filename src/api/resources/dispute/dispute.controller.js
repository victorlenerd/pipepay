import DisputeModel from "./dispute.model";
import InvoiceModel from "../invoice/invoice.model";
import generateController from "../../modules/generateController";
import { sendDisputeMail } from "../../modules/mailer";

const DisputeController = generateController(DisputeModel, {
	getInvoiceId: (req, res, next) => {
		const _id = req.params.invoiceId;

		InvoiceModel.findOne({ _id }, (err, doc) => {
			if (err)
				return res.status(400).send({
					error: {
						message: "Invoice with id does not exits"
					},
					success: false
				});
			req.invoice = doc;
			next();
		});
	},
	createOne: (req, res) => {
		const body = req.body;
		const {
			marchantEmail,
			customerEmail,
			customerName,
			marchantName,
			_id,
			status
		} = req.invoice;

		body.status = "open";
		body.invoiceId = _id;

		if (status === "paid") {
			InvoiceModel.findOneAndUpdate(
				{
					_id
				},
				{
					disputed: true,
					status: "rejected"
				},
				async (err, doc) => {
					if (err)
						return res.status(400).send({
							success: false,
							error: err
						});
					try {
						await sendDisputeMail(
							marchantEmail,
							customerEmail,
							customerName,
							marchantName,
							body.reason,
							body.from
						);

						res.send({
							data: doc,
							success: true
						});
					} catch (err) {
						console.log("err", err);
						return res.status(400).send({
							error: {
								message: "Could not send mail"
							},
							success: false
						});
					}
				}
			);
		}
	}
});

export default DisputeController;
