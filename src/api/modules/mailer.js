import nodemailer from "nodemailer";
const Sentry = require("@sentry/node");

const key = require('./keys.json');

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

export const sendTo = mailOption => {
	transporter.verify();
	transporter.sendMail({ ...mailOption, from }, (error, info) => {
		if (error) {
			return Sentry.captureException(error);
		}
	});
};
