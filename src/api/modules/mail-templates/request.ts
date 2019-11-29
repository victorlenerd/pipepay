export function sellerFundsTransferRequestMail(customerName, merchantName, acceptUrl, rejectUrl) {
	return `
		<p>Hello ${customerName}</p>
		
		<p>${merchantName} requested for transfer of payment you made. </p>
		
		<p>
			If you're satisfied with the transaction, please click this link to transfer 
			<a href="${acceptUrl}">I AM SATISFIED PAY ${merchantName}</a>
		</p>
		
		<p>
			On the other hand if you're not satisfied  click here to open a dispute
			<a href="${rejectUrl}">I AM NOT SATISFIED I WANT TO OPEN A DISPUTE</a> 
		</p>
		
		<p>
			Note that you cannot change your mind, once you click on any of the options. 
			Also, the funds could be transferred to the seller if you don't respond within 48hrs.
		</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
`
};

export function buyerPaymentRequestMail(customerName, merchantName, paymentRequestUrl) {
	return `
		<p>Hello ${customerName}</p>
		
		<p>You're receiving this email because ${merchantName} created an escrow transaction for you on PipePay.</p>
		<a href="${paymentRequestUrl}">Click here to make payment.</a> 
		
		<br /><br />
		<p>
			An escrow is a type of transaction involving 3 individuals the buyer, seller and a middleman (intermediary). 
			PipePay protects buyers and sellers from fraudulent transactions.
			<a href="https://pipepay.co">Learn More.</a> 
		</p>
		
		<p>Thank you.</p>
		<p>PipePay Team.</p>
	`
}
