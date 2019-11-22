export function internalPipePayDisputeMail(customerName, CustomerEmail, disputeType, invoiceId, merchantName, merchantEmail, reason) {
	return `
		Dispute From ${customerName} (${CustomerEmail})
		
		Type: ${disputeType}
		Invoice: ${invoiceId}
		Merchant Name: ${merchantName} (${merchantEmail})
		Reason: ${reason}
	`;
}


export function sellerDisputeToBuyerMail(buyerName, sellerName) {
	return `
		Hello ${buyerName}

		${sellerName} opened a dispute.

		Thank you.
		PipePay Team.
	`
}

export function buyerDisputeToSellerMail(sellerName, buyerName) {
	return `
		Hello ${sellerName}

		${buyerName} opened a dispute.

		Thank you.
		PipePay Team.
	`
}
