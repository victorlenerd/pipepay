import React from "react";
import "./index.css";

const FAQ = () => (
	<>
		<div className="row">
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">What's Is Escrow?</h3>
				<p className="faq-body">An escrow is a type of transaction involving 3 individuals the buyer, seller and a middleman (intermediary). In an escrow transaction the money for the goods or service being purchased or sold is given to the middle man who holds on to it until both the buyer and seller are satisfied with the transactions will the money be released. Escrow transactions are necessary for business transactions in which the buyer and seller do not know each other, it is a means to prevent fraud and loss of property.</p>
			</div>
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">Why Use Escrow?</h3>
				<p className="faq-body">Escrows are necessary in transactions where animosity and unfamiliarity exist between the buyer and seller. It is also advice able to make use of escrow transactions when engaging in foreign and online transactions.</p>
			</div>
		</div>
		<div className="row">
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">What Is PipePay?</h3>
				<p className="faq-body">PipePay is an online escrow transaction system. PipePay acts as a middleman in online transactions, it provides safety of payment and guards against fraud for both buyer and seller.</p>
			</div>
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">Who Can Use PipePay?</h3>
				<p className="faq-body">PipePay can be used by buyers to protect against loss of fund and by sellers to prevent loss of property. pipepay offers both parties involved in a transaction a stress free way to ensure that their money or property is safe and secure when engaging in transactions with unknown individuals.</p>
			</div>
		</div>
		<div className="row">
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">Who Can Create A Transaction?</h3>
				<p className="faq-body">
					At this point only sellers can create transactions.
				</p>
			</div>
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">Who Pays For The Transaction?</h3>
				<p className="faq-body">
					The payment for the transaction can be paid by the seller or buyer or it could be shared between both buyer ans seller.
				</p>
			</div>
		</div>
		<div className="row">
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">What Is The Process Like?</h3>
				<p className="faq-body">
					The seller creates the transaction and the buyer receives a confirmation email along with the link to the invoice.
					The seller get's a notification that the buyer has paid and is required to ship the item to the buyer.
					We automatically request that the payment get's transferred to the seller when the inspection date elapse.
					The buyer has to either open a dispute or approve that the funds get transferred to the seller.
				</p>
			</div>
			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<h3 className="faq-title">What If there is dispute?</h3>
				<p className="faq-body">
					We carefully assess the situation and consider who's
				</p>
			</div>
		</div>
	</>
);

export default FAQ;
