export function sellerWithdrawConfirmationMail(sellerName, amount, accountName, accountNumber) {
	return `
		<p>Hello ${sellerName}</p>
		
		<p>We've received your request to transfer the sum of ${amount} to your bank account with the following details:</p> 
		
		<p>Account Name: ${accountName}</p>
		<p>Account Number: ${accountNumber}</p>
				
		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`
}

export function internalPipePayWithdrawNotificationMail(sellerName, amount, accountName, accountNumber, bankCode) {
	return `
		<p>Hello ${sellerName}</p>
		
		<p>Requested payment of ${amount}:</p>
		
		<p>Account Name: ${accountName}</p>
		<p>Account Number: ${accountNumber}</p>
		<p>Bank Code: ${bankCode}</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`
}
