export function internalPipePayDisputeMail(customerName, CustomerEmail, disputeType, invoiceId, merchantName, merchantEmail, reason) {
	return `
		<p>Dispute From ${customerName} (${CustomerEmail})</p>
		
		<p>Type: ${disputeType}</p>
		<p>Invoice: ${invoiceId}</p>
		<p>Merchant Name: ${merchantName} (${merchantEmail})</p>
		<p>Reason: ${reason}</p>
	`;
}


export function sellerDisputeToBuyerMail(buyerName, sellerName) {
	return `
		<p>Hello ${buyerName}</p>

		<p>${sellerName} opened a dispute.</p>

		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`
}

export function buyerDisputeToSellerMail(sellerName, buyerName) {
	return `
		<p>Hello ${sellerName}</p>

		<p>${buyerName} opened a dispute.</p>

		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`
}
