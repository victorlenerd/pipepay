import InvoiceModel from "./invoice.model";
import recode from "../../modules/recode";
import generateController from "../../modules/generateController";
import { CreatePayStackInvoice } from "../../modules/invoice";

const Sentry = require("@sentry/node");

const QUERY_PARAMS = "_id type deliveryAmount customerName customerPhone customerEmail created_at purchaseAmount totalPrice whoPaysDeliveryFee whoPaysPipePayFee milestones pipePayFee bankCharges status requested disputed";

export default generateController(InvoiceModel, {
	createOne: async (req, res) => {
		const newInvoice = {};

		newInvoice.userId = req.user.sub;
		newInvoice.merchantUsername = req.user["cognito:username"];
		newInvoice.merchantEmail = req.user.email;
		newInvoice.merchantName = req.user.name;

		newInvoice.category = req.body.category;
		newInvoice.description = req.body.description;

		newInvoice.customerName = req.body.customerName;
		newInvoice.customerEmail = req.body.customerEmail;
		newInvoice.customerPhone = req.body.customerPhone;

		newInvoice.type = req.body.type;

		newInvoice.verifyCode = recode();

		const pipePayFeePercent = 3.5;
		const pipePayFeeCap = 5000;

		newInvoice.purchaseAmount = Number(req.body.purchaseAmount);
		newInvoice.deliveryAmount = Number(req.body.deliveryAmount);

		newInvoice.bankCharges = 150;

		newInvoice.pipePayFee = Math.min((newInvoice.purchaseAmount * pipePayFeePercent) / 100, pipePayFeeCap) + newInvoice.bankCharges;
		newInvoice.totalPrice = newInvoice.purchaseAmount + newInvoice.deliveryAmount + newInvoice.pipePayFee;

		newInvoice.whoPaysDeliveryFee = req.body.whoPaysDeliveryFee;
		newInvoice.whoPaysPipePayFee = req.body.whoPaysPipePayFee;

		let line_items = [];

		let customerTotalAmount = newInvoice.purchaseAmount;
		let customerDeliveryFee = 0;
		let customPipePayFee = 0;

		const balancePayment = (who, original, fee) => {
			if (who === "both") {
				return (original += fee / 2);
			} else if (who === "buyer") {
				return (original += fee);
			} else {
				return original;
			}
		};

		customerDeliveryFee = balancePayment(newInvoice.whoPaysDeliveryFee, customerDeliveryFee,  newInvoice.deliveryAmount);
		customPipePayFee = balancePayment(newInvoice.whoPaysPipePayFee, customPipePayFee, newInvoice.pipePayFee);

		line_items = [{ name: "Purchase Price", amount: customerTotalAmount * 100 }];

		if (customPipePayFee > 0) {
			line_items.push({
				name: "PipePay Fee",
				amount: customPipePayFee * 100
			});
		}

		if (customerDeliveryFee > 0) {
			line_items.push({
				name: "Delivery Fee",
				amount: customerDeliveryFee * 100
			});
		}

		newInvoice.status = "processing";
		newInvoice.requested = false;
		newInvoice.disputed = false;
		newInvoice.invoice_code = recode();

		const newInvoiceCallback = async (err, doc) => {
			if (err || doc === null) {
				Sentry.captureException(err);
				res.status(400).send({
					error: err,
					success: false
				});
			}

			try {
				const { customerEmail, customerName, customerPhone } = newInvoice;

				const { data: { request_code: invoice_code } } = await CreatePayStackInvoice({
					email: customerEmail,
					name: customerName,
					phone: customerPhone
				}, customerTotalAmount * 100, newInvoice.description, line_items);
				await InvoiceModel.findOneAndUpdate({ _id: doc._id }, { $set: { invoice_code, status: "sent" } });
				delete doc.verifyCode;
				doc.save();

				return res.send({ data: doc, success: true });
			} catch (e) {
				Sentry.captureException(err);
				return res.send({ error: err.message, success: false });
			}
		};

		return InvoiceModel.create(newInvoice, newInvoiceCallback);
	},
	getAll: async (req, res) => {

		if (!req.user)
			res.status(403).send({ success: false, error: "Invalid auth token" });

		const userId = req.user.sub;
		const page = req.query.page;
		const limit = req.query.limit;
		const from = req.query.from;
		const to = req.query.to;
		const search = req.query.search;
		const query = { userId };
		const options = {
			select: QUERY_PARAMS,
			sort: { created_at: -1 },
			limit: Number(limit),
			page: Number(page)
		};

		if (from && to) query.created_at = { $gte: from, $lte: to };
		if (search) {
			query.$text = { $search: search };
		}

		try {
			const invoices = await InvoiceModel.paginate(query, options);
			const { docs, total, limit, page } = invoices;

			res
				.status(200)
				.send({ data: { invoices: docs, total, limit, page }, success: true });
		} catch (err) {
			Sentry.captureException(err);
			res.status(400).send({ err, success: false });
		}
	},
	getOne: (req, res) => {
		const id = req.docId || req.params.invoiceId;

		InvoiceModel.findOne({ _id: id }, QUERY_PARAMS, function(err, doc) {
			if (err) {
				Sentry.captureException(err);
				res.status(400).send({ success: false, error: { ...err } });
			}

			if (!doc)
				res.status(400).send({
					success: false,
					error: { message: "Invoice does not exist" }
				});
			res.status(200).send({ success: true, data: doc });
		});
	}
});
