import nodemailer from "nodemailer";

let host;

if (process.env.NODE_ENV === "staging") {
	host = "https://staging.pipepay.africa/confirm";
} else if (process.env.NODE_ENV === "production") {
	host = "https://pipepay.africa/confirm";
} else if (
	process.env.NODE_ENV === "testing" ||
	process.env.NODE_ENV === "development"
) {
	host = "http://localhost:4545/confirm";
} else {
	host = "http://localhost:4545/confirm";
}

const ZOHO_EMAIL = process.env.ZOHO_EMAIL;
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD;

const transporter = nodemailer.createTransport({
	host: "smtp.zoho.com",
	port: 465,
	secure: true,
	auth: {
		user: ZOHO_EMAIL,
		pass: ZOHO_PASSWORD
	}
});

const from = "Pipepay <hello@pipepay.africa>";

export const sendInvoiceMail = ({ customerEmail, totalPrice }) =>
	new Promise((resolve, reject) => {
		let mailOptions = {
			from,
			to: customerEmail,
			subject: "Your Invoice Is Ready",
			text: `Your invoice is worth ${totalPrice}`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return reject(new Error(error));
			}

			resolve(info);
		});
	});

const sendTo = mailOption =>
	new Promise((resolve, reject) => {
		transporter.sendMail(mailOption, (error, info) => {
			if (error) {
				return reject(new Error(error));
			}
			resolve(info);
		});
	});

export const sendReceiptMail = (
	customerName,
	customerEmail,
	marchantEmail,
	amount
) =>
	new Promise(async (resolve, reject) => {
		let mailOption = {
			from,
			subject: "Your Receipt Is Ready",
			text: `${customerName} made payment of ${amount}`
		};
		Promise.race([
			sendTo({ ...mailOption, to: customerEmail }),
			sendTo({ ...mailOption, to: marchantEmail })
		])
			.then(resolve)
			.catch(reject);
	});

export const sendTransferMail = (customerEmail, marchantEmail) =>
	new Promise((esolve, reject) => {});

export const sendDisputeMail = (
	marchantEmail,
	customerEmail,
	customerName,
	marchantName,
	reason,
	disputeFrom,
	supportEmail = "support@pipepay.zohodesk.com"
) =>
	new Promise(async (resolve, reject) => {
		let mailOption = {
			from: "hello@pipepay.africa",
			subject: "PipePay Payment Dispute"
		};

		try {
			if (disputeFrom !== "marchant") {
				await Promise.all([
					sendTo({
						...mailOption,
						to: "hello@pipepay.africa",
						text: `New dispute from ${customerEmail} reason being that: "${reason}" marchant email is ${marchantEmail}`
					}),
					sendTo({
						...mailOption,
						to: marchantEmail,
						text: `New dispute from ${customerName} reason being that: "${reason}"`
					})
				]);
			} else {
				await Promise.all([
					sendTo({
						...mailOption,
						to: "hello@pipepay.africa",
						text: `New dispute from ${marchantEmail} reason being that: "${reason}" customer email is ${customerEmail}`
					}),
					sendTo({
						...mailOption,
						to: customerEmail,
						text: `New dispute from ${customerName} reason being that: "${reason}"`
					})
				]);
			}
			resolve();
		} catch (err) {
			console.log("err", err);
			reject(err);
		}
	});

export const sendCustormerVerificationCode = (customerEmail, code) =>
	new Promise(async (resolve, reject) => {
		let mailOption = {
			from,
			subject: "Invoice Mail Verification",
			text: `Your invoice verfication code is ${code}`
		};

		try {
			await sendTo({ ...mailOption, to: customerEmail });
			resolve();
		} catch (err) {
			reject(err);
		}
	});

export const sendPaymentRequest = (
	type,
	customerEmail,
	customerName,
	marchantName,
	acceptToken,
	rejectToken,
	milestoneIndex
) =>
	new Promise(async (resolve, reject, url) => {
		let mailOption = {
			from,
			subject: "Payment Request",
			html: `
			<p>Hey ${customerName}!</p>
			
			<p>
				${marchantName}
				${
					type === "good"
						? "requested for transfer of payment you made"
						: `requested for transfer of payment for milestone ${milestoneIndex +
								1}`
				}.
			</p>

			<p>If you're satisfied with ${
				type === "good" ? "good" : "service"
			} please click this link to transfer 
				<a href="${host}/${acceptToken}">I AM SATISFIED PAY ${marchantName}</a>
			</p>

			<p>
				On the other hand if you're not satisfied  click here to open a disputes 
				<a href="${host}/${rejectToken}">I AM NOT SATISFIED I WANT TO OPEN A DISPUTE ${marchantName}</a> 
			</p>

			<p>
				Thanks,
				Your friends at PipePay
			</p>`
		};

		try {
			await sendTo({ ...mailOption, to: customerEmail });
			resolve();
		} catch (err) {
			reject(err);
		}
	});
