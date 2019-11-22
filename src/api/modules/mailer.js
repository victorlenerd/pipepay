import nodemailer from "nodemailer";
const Sentry = require("@sentry/node");

const key = require('./key.json');

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "OAuth2",
		user: "hello@pipepay.co",
		serviceClient: key.client_id,
		privateKey: key.private_key
	}
});

const from = "PipePay Team <hello@pipepay.co>";

export const sendTo = mailOption => transporter.sendMail({ ...mailOption, from }, (error, info) => {
		if (error) {
			return Sentry.captureException(error);
		}
});

export const sendCustormerVerificationCode = (customerEmail, code) =>
	new Promise(async (resolve, reject) => {
		let mailOption = {
			from,
			subject: "Invoice Mail Verification",
			text: `Your invoice verification code is ${code}`
		};

		try {
			await sendTo({
				...mailOption,
				to: customerEmail
			});
			resolve();
		} catch (err) {
			reject(err);
		}
	});
