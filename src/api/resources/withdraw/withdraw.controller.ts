import generateController from "../../modules/generateController";
import WithdrawModel from "./withdraw.model";
import SellerModel, { ISellerModel } from "../seller/seller.model";
const Sentry = require("@sentry/node");

import { sendTo } from "../../modules/mailer";
import { sellerWithdrawConfirmationMail, internalPipePayWithdrawNotificationMail } from "../../modules/mail-templates/withdraw";

export default generateController(WithdrawModel, {
	createOne: async (req, res) => {
		const userId = req.user.sub;
		const merchantEmail = req.user.email;
		const merchantName = req.user.name;
		const merchantBankName = req.user["custom:bank_code"];
		const merchantBankAccountNumber = req.user["custom:account_number"];
		const merchantBankAccountName = req.user["custom:account_name"];

		const withdrawAmount: number = req.body.amount;

		try {
			const seller = await SellerModel.findOne({ userId }) as any as ISellerModel;
			const remainder = seller.balance - withdrawAmount;

			if (remainder < 0) {
				return res.status(400).send({
					status: false,
					error: "Withdraw amount is less than seller's balance"
				});
			}

			await SellerModel.findOneAndUpdate({ _id: seller._id }, { amount: remainder });
			await WithdrawModel.create({ userId, amount: withdrawAmount, sent: false });

			sendTo({
				to: "withdraw@pipepay.co",
				subject: `Withdraw of ${withdrawAmount} from ${merchantName}`,
				text: internalPipePayWithdrawNotificationMail(merchantName, withdrawAmount,merchantBankAccountName, merchantBankAccountNumber, merchantBankName)
			});

			sendTo({
				to: merchantEmail,
				subject: `Withdraw of request received`,
				text: sellerWithdrawConfirmationMail(merchantName, withdrawAmount,merchantBankAccountName, merchantBankAccountNumber)
			});

			res.status(200).send({ status: true });
		} catch(e) {
			Sentry.captureException(e);
			return res.status(500).send({ error: e.message, status: false });
		}
	},
	getAll: async (req, res) => {
		const userId = req.user.sub;

		try {
			const withdraws = await WithdrawModel.find({ userId });
			res.status(200).send({ status: true, withdraws });
		} catch (e) {
			Sentry.captureException(e);
			return res.status(500).send({ error: e.message, status: false });
		}
	}
});
