export function buyerPaymentTransferMail(customerName, amount, sellerName) {
	return `
		Hello ${customerName}
		
		Your payment of ${amount} has been transferred to ${sellerName}.
		
		Thank you.
		PipePay Team.
	`
}

export function sellerPaymentReceivedConfirmation(sellerName, amount, customerName) {
	return `
		Hello ${sellerName}
		
		A payment of ${amount} from ${customerName} has been received.
		
		Thank you.
		PipePay Team.
 	`;
}
