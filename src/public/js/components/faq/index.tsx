import React from "react";
import "./index.css";

const FAQ = () => {
	const [state, setState] = React.useState({
		faqs: [2, 3, 4, 5, 6, 7, 8]
	});

	const { faqs } = state;

	const openFaQ = React.useCallback((faq: number) => {


		setState((state) => {

			if (state.faqs.includes(faq)) {
				return ({
					faqs: state.faqs.filter((f) => f != faq)
				})
			} else {
				return ({
					faqs: state.faqs.concat(faq)
				})
			}
	});

	}, [state]);

	return (
		<>
			<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12">

			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(1)}>What's Is Escrow?</h3>
				<p className="faq-body" style={faqs.includes(1) ? { display: "none" } : { display: "block" }}>
					An escrow is a type of transaction involving 3 individuals the buyer, seller and a
					middleman (intermediary). In an escrow transaction the money for the goods or service being purchased or
					sold is given to the middle man who holds on to it until both the buyer and seller are satisfied with the
					transactions will the money be released. Escrow transactions are necessary for business transactions in
					which the buyer and seller do not know each other, it is a means to prevent fraud and loss of property.
				</p>
			</div>

			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(2)}>Why Use Escrow?</h3>
				<p className="faq-body" style={faqs.includes(2) ? { display: "none" } : { display: "block" }}>
					Escrows are necessary in transactions where animosity and unfamiliarity exist between
					the buyer and seller. It is also advice able to make use of escrow transactions when engaging in foreign and
					online transactions.</p>
			</div>


			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(3)}>What Is PipePay?</h3>
				<p className="faq-body" style={faqs.includes(3) ? { display: "none" } : { display: "block" }}>
					PipePay is an online escrow transaction system. PipePay acts as a middleman in online
					transactions, it provides safety of payment and guards against fraud for both buyer and seller.
				</p>
			</div>
			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(4)}>Who Can Use PipePay?</h3>
				<p className="faq-body" style={faqs.includes(4) ? { display: "none" } : { display: "block" }}>
					PipePay can be used by buyers to protect against loss of fund and by sellers to
					prevent loss of property. PipePay offers both parties involved in a transaction a stress free way to ensure
					that their money or property is safe and secure when engaging in transactions with unknown individuals.
				</p>
			</div>

			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(5)}>Who Can Create A Transaction?</h3>
				<p className="faq-body" style={faqs.includes(5) ? { display: "none" } : { display: "block" }}>
					Only sellers can create transactions.
				</p>
			</div>

			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(6)}>Who Pays For The Transaction?</h3>
				<p className="faq-body" style={faqs.includes(6) ? { display: "none" } : { display: "block" }}>
					The payment for the transaction can be paid by the seller or buyer or it could be shared between both buyer
					ans seller. The transaction cost is 5% + ₦150 which is capped at 5000.
				</p>
			</div>

			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(7)}>What Is The Process Like?</h3>
				<p className="faq-body" style={faqs.includes(7) ? { display: "none" } : { display: "block" }}>
					The seller creates the transaction and the buyer receives a confirmation email along with the link to the
					invoice.
					The seller get's a notification that the buyer has paid and is required to ship the item to the buyer.
					We automatically request that the payment get's transferred to the seller when the inspection date elapse.
					The buyer has to either open a dispute or approve that the funds get transferred to the seller.
				</p>
			</div>

			<div className="row">
				<h3 className="faq-title" onClick={() => openFaQ(8)}>What If there is dispute?</h3>
				<p className="faq-body" style={faqs.includes(8) ? { display: "none" } : { display: "block" }}>
					If there is dispute during the transaction process i.e "The goods the buyer received is not what they
					ordered", or "the buyer doesn't respond after receiving the goods" the buyer or seller has the option to
					open a dispute, we shall step in and resolve the dispute fairly and promptly.
				</p>
			</div>

			</div>
		</>
	);
};

export default FAQ;
