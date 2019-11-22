export function sellerPaymentReceivedMail (sellerName, amount, customerName) {
	return `
		<p>Hello ${sellerName}</p>
		
		<p>${customerName} made a payment of ${amount} to our account.</p>
		<p>Now you can go ahead to make the shipment.</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`;
}
