export function sellerPaymentReceivedMail (sellerName, amount, customerName) {
	return `
		<p>Hello ${sellerName}</p>
		
		<p>${customerName} made a payment of ${amount} to our account.</p>
		<p>Now you can go ahead to ship the item to ${customerName}.</p>
		
		<p>
			Note: Please keep the proof of shipment like receipts from your shipping courier. 
			This would be useful to prove that you shipped to ${customerName}
		</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`;
}
