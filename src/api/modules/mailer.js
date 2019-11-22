import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
const Sentry = require("@sentry/node");

let transporter = null;

fs.readFile(path.join(__dirname, "keys.txt"), "utf8", (err, data) => {
	if (err) {
		throw err;
	}

	console.log("data", `${data}`);

	const keys = JSON.parse(`${data}`);

	transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAuth2",
			user: "hello@pipepay.co",
			serviceClient: keys.client_id,
			privateKey: keys.private_key
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
