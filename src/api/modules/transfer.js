import request from "superagent";
const secret = process.env.PAYSTACK_SECRET;

const getReceipt = (name, account_number, bank_code) =>
	new Promise((resolve, reject) => {
		request
			.post("https://api.paystack.co/transferrecipient")
			.set("Authorization", `Bearer ${secret}`)
			.send({
				type: "nuban",
				name,
				account_number,
				bank_code,
				currency: "NGN"
			})
			.end((err, { body }) => {
				if (err) {
					console.log("err1", err);
					reject(err);
				}
				resolve(body);
			});
	});

const makeTransfer = (recipient_code, amount) =>
	new Promise((resolve, reject) => {
		request
			.post("https://api.paystack.co/transfer")
			.set("Authorization", `Bearer ${secret}`)
			.send({
				source: "balance",
				amount,
				recipient: recipient_code,
				currency: "NGN"
			})
			.end((err, { body }) => {
				if (err) {
					console.log("err2", err);
					reject(err);
				}
				resolve(body);
			});
	});

const transfer = (name, account_number, bank_code, amount) =>
	new Promise(async (resolve, reject) => {
		try {
			const {
				status,
				data: { recipient_code }
			} = await getReceipt(name, account_number, bank_code);

			if (status && recipient_code) {
				const { status } = await makeTransfer(recipient_code, amount * 100);
				if (status) resolve();
			} else {
				reject(new Error("No recipient_code"));
			}
		} catch (err) {
			console.log("err3", err);
			reject(err);
		}
	});

export default transfer;
