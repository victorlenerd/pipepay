export function sellerPaymentReceivedMail (sellerName, amount, customerName) {
	return `
		Hello ${sellerName}
		
		${customerName} made a payment of ${amount} to our account. 
		Now you can go ahead to make the shipment.
		
		Thank you.
		PipePay Team.
	`;
}
