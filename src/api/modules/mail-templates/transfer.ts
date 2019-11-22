export function buyerPaymentTransferMail(customerName, amount, sellerName) {
	return `
		<p>Hello ${customerName}</p>
		
		<p>Your payment of ${amount} has been transferred to ${sellerName}.</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`
}

export function sellerPaymentReceivedConfirmation(sellerName, amount, customerName) {
	return `
		<p>Hello ${sellerName}</p>
		
		<p>A payment of ${amount} from ${customerName} has been received.</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
 	`;
}
