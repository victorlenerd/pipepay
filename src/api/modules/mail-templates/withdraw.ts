export function sellerWithdrawConfirmationMail(sellerName, amount, accountName, accountNumber) {
	return `
		Hello ${sellerName}
		
		We've received your request to transfer the sum of ${amount} to your bank account with the following details: 
		
		Account Name: ${accountName}
		Account Number: ${accountNumber}
				
		Thank you.
		PipePay Team.
	`
}

export function internalPipePayWithdrawNotificationMail(sellerName, amount, accountName, accountNumber, bankCode) {
	return `
		Hello ${sellerName}
		
		Requested payment of ${amount}:
		
		Account Name: ${accountName}
		Account Number: ${accountNumber}
		Bank Code: ${bankCode}
		
		Thank you.
		PipePay Team.
	`
}
