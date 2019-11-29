import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
const Sentry = require("@sentry/node");

let transporter = null;

let client_id = process.env.MAILER_CLIENT_ID;

fs.readFile(path.join(__dirname, "private_key.txt"), "utf8", (err, private_key) => {
	if (err) { throw err; }

	console.log({ private_key });

	transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAuth2",
			user: "hello@pipepay.co",
			serviceClient: client_id,
			privateKey: private_key
		}
	});

	transporter.verify();
});

export const sendTo = mailOption => {
	transporter.sendMail({ ...mailOption, from: "PipePay Team <hello@pipepay.co>" }, (error, info) => {
		if (error) {
			return Sentry.captureException(error);
		}
	});
};
