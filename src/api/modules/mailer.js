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
	merchantEmail,
	amount
) =>
	new Promise(async (resolve, reject) => {
		let mailOption = {
			from,
			subject: "Pipepay Payment Receipt",
			text: `${customerName} made payment of ${amount}`
		};
		Promise.race([
			sendTo({
				...mailOption,
				to: customerEmail
			}),
			sendTo({
				...mailOption,
				to: merchantEmail
			})
		])
			.then(resolve)
			.catch(reject);
	});

const makeDisputeMail = (invoice, disputeType, reason) => {
	const main = `
			<p>Hello</p>

			<p>${disputeType}</p>
			<p>${invoice.customerName} opened a dispute in respect to invoice with id <b>${
		invoice._id
	}</b> from ${invoice.merchantName}.</p>

			<h5>Reason For Dispute</h5> 
			<p>${reason}</p>
		`;

	if (invoice.type === "good") {
		return `		
			${main}

			<table>
				<thead>
					<tr>
						<td>Type</td>
						<td>Description</td>
						<td>Who Paid Pipepay Fee</td>
						<td>Who Paid Delivery Fee</td>
						<td>Price Of Good</td>
						<td>Delivery Fee</td>
						<td>Bank Charges</td>
						<td>Pipepay Fee</td>
						<td>Matchant ID</td>
						<td>Customer Name</td>
						<td>Customer Email</td>
						<td>Customer Phone</td>
						<td>merchant Account Number</td>
						<td>merchant Bank Code</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${invoice.type}</td>
						<td>${invoice.description}</td>
						<td>${invoice.whoPaysPipepayFee}</td>
						<td>${invoice.whoPaysDeliveryFee}</td>
						<td>${invoice.purchaseAmount}</td>
						<td>${invoice.deliveryAmount}</td>
						<td>${invoice.bankCharges}</td>
						<td>${invoice.pipePayFee}</td>
						<td>${invoice.userId}</td>
						<td>${invoice.customerName}</td>
						<td>${invoice.customerEmail}</td>
						<td>${invoice.customerPhone}</td>
						<td>${invoice.merchantAccountNumber}</td>
						<td>${invoice.merchantBankCode}</td>
					</tr>
				</tbody>
			</table>
			`;
	} else {
		let milestonesBody = "";

		invoice.milestones.forEach(milestone => {
			milestonesBody += `
					<tr>
						<td>${milestone.amount}</td>
						<td>${milestone.description}</td>
						<td>${milestone.dueDate}</td>
						<td>${milestone.paid}</td>
						<td>${milestone.requested}</td>
					</tr>
				`;
		});

		return `
			${main}

			<table>
			<thead>
				<tr>
					<td>Type</td>
					<td>Description</td>
					<td>Price Of Good</td>
					<td>Bank Charges</td>
					<td>Pipepay Fee</td>
					<td>Matchant ID</td>
					<td>Customer Name</td>
					<td>Customer Email</td>
					<td>Customer Phone</td>
					<td>merchant Account Number</td>
					<td>merchant Bank Code</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>${invoice.type}</td>
					<td>${invoice.description}</td>
					<td>${invoice.purchaseAmount}</td>
					<td>${invoice.bankCharges}</td>
					<td>${invoice.pipePayFee}</td>
					<td>${invoice.userId}</td>
					<td>${invoice.customerName}</td>
					<td>${invoice.customerEmail}</td>
					<td>${invoice.customerPhone}</td>
					<td>${invoice.merchantAccountNumber}</td>
					<td>${invoice.merchantBankCode}</td>
				</tr>
			</tbody>
		</table>	
		<table>
			<thead>
				<tr>
					<td>Amount</td>
					<td>Description</td>
					<td>Due Date</td>
					<td>Paid</td>
					<td>Requested</td>
				</tr>
			</thead>
			<tbody>
				${milestonesBody}
			</tbody>
		</table>					
		`;
	}
};

export const sendDisputeMail = (invoice, disputeType, reason, disputeFrom) =>
	new Promise(async (resolve, reject) => {
		const {
			merchantEmail,
			customerEmail,
			customerName,
			merchantName,
			_id,
			type
		} = invoice;

		let mailOption = {
			from: "hello@pipepay.africa <hello@pipepay.africa>",
			subject: "PipePay Payment Dispute"
		};

		try {
			if (disputeFrom === "customer") {
				await Promise.all([
					sendTo({
						...mailOption,
						to: "hello@pipepay.africa",
						html: makeDisputeMail(invoice, disputeType, reason)
					}),
					sendTo({
						...mailOption,
						to: customerEmail,
						html: `
							<p>Hello ${customerName}</p>
								
							<p>Our agents would be in touch with you very soon concerning your dispute with ${merchantName}</p>

							<p>
								Thanks,
								Your friends at PipePay
							</p>
						`
					}),
					sendTo({
						...mailOption,
						to: merchantEmail,
						html: `
							<p>Hello ${merchantName}</p>

							<p>${customerName} opened a dispute concerning payment for "${
							invoice.description
						}"</p>
							<p>Our agents would be in touch with you very soon</p>

							<p>
								Thanks,
								Your friends at PipePay
							</p>
						`
					})
				]);
			} else {
				await Promise.all([
					sendTo({
						...mailOption,
						to: "hello@pipepay.africa",
						html: makeDisputeMail(invoice, disputeType, reason)
					}),
					sendTo({
						...mailOption,
						to: merchantEmail,
						html: `
							<p>Hello ${merchantName}</p>
								
							<p>Our agents would be in touch with you very soon concerning your dispute with ${customerName}</p>

							<p>
								Thanks,
								Your friends at PipePay
							</p>
						`
					}),
					sendTo({
						...mailOption,
						to: customerEmail,
						html: `
							<p>Hello ${customerName}</p>
								
							<p>${merchantName} opened a dispute concerning payment for "${
							invoice.description
						}"</p>
							<p>Our agents would be in touch with you very soon</p>

							<p>
								Thanks,
								Your friends at PipePay
							</p>
						`
					})
				]);
			}
			resolve();
		} catch (err) {
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
			await sendTo({
				...mailOption,
				to: customerEmail
			});
			resolve();
		} catch (err) {
			reject(err);
		}
	});

export const sendPaymentRequest = (
	type,
	customerEmail,
	customerName,
	merchantName,
	acceptToken,
	rejectToken,
	milestoneIndex
) =>
	new Promise(async (resolve, reject, url) => {
		let mailOption = {
			from,
			subject: "Piepay Payment Request",
			html: `
			<p>Hey ${customerName}!</p>
			
			<p>
				${merchantName}
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
				<a href="${host}/${acceptToken}">I AM SATISFIED PAY ${merchantName}</a>
			</p>

			<p>
				On the other hand if you're not satisfied  click here to open a disputes 
				<a href="${host}/${rejectToken}">I AM NOT SATISFIED I WANT TO OPEN A DISPUTE ${merchantName}</a> 
			</p>

			<p>
				Thanks,
				Your friends at PipePay
			</p>`
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

export const sendInvoiceConfirmSent = (
	merchantName,
	merchantEmail,
	customerName,
	customerEmail,
	invoiceLink
) =>
	new Promise(async (resolve, reject) => {
		const body = `
		<p>Hello ${merchantName}</p>

		<p>Your invoice has been sent to ${customerName}, here's the link to the invoice ${invoiceLink}.</p>

		<p>
			Thanks,
			Your friends at PipePay
		</p>
	`;

		let mailOption = {
			from,
			subject: "Pipepay Invoice Sent",
			html: body
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

export const sendTransefConfirm = (
	customerName,
	customerEmail,
	merchantName,
	merchantEmail,
	amount
) =>
	new Promise(async (resolve, reject) => {
		const customerBody = `
		<p>Hello ${customerName}</p>

		<p>Your payment has successfully been transfered to ${merchantName}</p>

		<p>
			Thanks,
			Your friends at PipePay
		</p>
	`;

		const merchantBody = `
		<p>Hello ${merchantName}</p>

		<p>${amount} from ${customerName} has been transfered to your account.</p>

		<p>
			Thanks,
			Your friends at Pipepay
		</p>
	`;

		let mailOption = {
			from,
			subject: "Pipepay Payment Transfer"
		};

		try {
			await sendTo({
				...mailOption,
				html: customerBody,
				to: customerEmail
			});
			await sendTo({
				...mailOption,
				html: merchantBody,
				to: merchantEmail
			});
			resolve();
		} catch (err) {
			reject(err);
		}
	});
