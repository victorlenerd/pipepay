import InvoiceModel from "./invoice.model";
import recode from "../../modules/recode";
import generateController from "../../modules/generateController";
import { CreateInvoice } from "../../modules/invoice";
import { getTime, format, subHours } from "date-fns";
const Sentry = require("@sentry/node");

const QUERY_PARAMS =
	"_id type deliveryAmount customerName customerPhone customerEmail created_at purchaseAmount totalPrice whoPaysDeliveryFee whoPaysPipepayFee milestones pipePayFee bankCharges status requested disputed";

export default generateController(InvoiceModel, {
	createOne: async (req, res) => {
		var body = req.body;

		body.userId = req.user.sub;
		body.marchantEmail = req.user.email;
		body.marchantName = req.user.name;
		body.marchantAccountNumber = req.user["custom:account_number"];
		body.marchantBankCode = req.user["custom:bank_code"];

		body.verifyCode = recode();

		if (body.type === "good") {
			body.purchaseAmount = Number(body.purchaseAmount);
			body.deliveryAmount = Number(body.deliveryAmount);

			body.bankCharges = 100;
			body.pipePayFee =
				Math.min((body.purchaseAmount * 5) / 100, 5000) + body.bankCharges;
			body.totalPrice =
				body.purchaseAmount + body.deliveryAmount + body.pipePayFee;
		} else {
			body.bankCharges = body.milestones.length * 50;
			body.purchaseAmount = body.milestones.reduce((pv, { amount }) => {
				return Number(amount) + pv;
			}, 0);
			body.pipePayFee =
				Math.min((body.purchaseAmount * 5) / 100, 5000) + body.bankCharges;
			body.deliveryAmount = 0;
			body.totalPrice = body.purchaseAmount + body.pipePayFee;
		}

		let line_items = [];

		let customerTotalAmount = body.purchaseAmount;
		let customerDeliveryFee = 0;
		let customPipepayFee = 0;

		const reconciliator = (who, original, fee) => {
			if (who === "both") {
				return (original += fee / 2);
			} else if (who === "buyer") {
				return (original += fee);
			} else {
				return original;
			}
		};

		customerDeliveryFee = reconciliator(
			body.whoPaysDeliveryFee,
			customerDeliveryFee,
			body.deliveryAmount
		);
		customPipepayFee = reconciliator(
			body.whoPaysPipepayFee,
			customPipepayFee,
			body.pipePayFee
		);

		if (body.type === "good") {
			line_items = [
				{ name: "Purchase Price", amount: customerTotalAmount * 100 }
			];
			if (customPipepayFee > 0)
				line_items.push({
					name: "PipePay Fee",
					amount: customPipepayFee * 100
				});
			if (customerDeliveryFee > 0)
				line_items.push({
					name: "Delivery Fee",
					amount: customerDeliveryFee * 100
				});
		} else {
			line_items = body.milestones.map(({ description, amount }) => ({
				name: description,
				amount: amount * 100
			}));
			line_items.push({ name: "PipePay Fee", amount: body.pipePayFee * 100 });
		}

		CreateInvoice(
			{
				email: body.customerEmail,
				name: body.customerName,
				phone: body.customerPhone
			},
			customerTotalAmount * 100,
			body.description,
			line_items
		)
			.then(({ data: { request_code } }) => {
				//TODO: Update Email Status to sent
				body.invoice_code = request_code;
			})
			.catch(err => {
				Sentry.captureException(err);
			});

		body.status = "processing";
		body.requested = false;
		body.disputed = false;

		InvoiceModel.create(body, async (err, doc) => {
			if (err) {
				Sentry.captureException(err);
				res.status(400).send({
					error: { message: "Could not create the invoice" },
					success: false
				});
			}
			delete doc.verifyCode;
			doc.status = "sent";
			doc.save();
			res.send({ data: doc, success: true });
		});
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
		var id = req.docId || req.params.invoiceId;

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
