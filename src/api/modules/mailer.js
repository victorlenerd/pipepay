import nodemailer from "nodemailer";
const Sentry = require("@sentry/node");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "OAuth2",
		user: "hello@pipepay.co",
		serviceClient: process.env.MAILER_CLIENT_ID,
		privateKey: process.env.MAILER_PRIVATE_KEY
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
