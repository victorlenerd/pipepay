import React from "react";

class NewInvoice extends React.Component {
	constructor() {
		super();
		this.state = {
			stage: 0,
			canSubmit: false,
			type: null,
			who_pays_delivery_fee: null,
			who_pays_pipepay_fee: null,
			delivery_fee: null,
			description: null,
			purchase_amount: null,
			customerInfo: null,
			milestones: [
				{
					description: "",
					amount: "",
					dueDate: "",
				},
				{
					description: "",
					amount: "",
					dueDate: "",
				},
				{
					description: "",
					amount: "",
					dueDate: "",
				},
			],
		};
	}

  submitInvoiceType = e => {
  	e.preventDefault();
  	const invoice_type = e.target.invoice_type.value;
  	if (e.target.checkValidity()) {
  		this.setState({ type: invoice_type, stage: invoice_type === "goods" ? 1 : 5 });
  	}
  }

  submitDeliveryType = e => {
  	e.preventDefault();
  	const who_pays_delivery_fee = e.target.who_pays_delivery_fee.value;
  	if (e.target.checkValidity()) {
  		this.setState({ who_pays_delivery_fee, stage: 3 });
  	}
  }

  submitPipepayType = e => {
  	e.preventDefault();
  	const who_pays_pipepay_fee = e.target.who_pays_pipepay_fee.value;
  	if (e.target.checkValidity()) {
  		this.setState({ who_pays_pipepay_fee, stage: 4 });
  	}
  }

  submitPurchaseInfo = e => {
  	e.preventDefault();

  	const purchase_amount = e.target.purchase_amount.value;
  	const delivery_fee = e.target.delivery_fee.value;
  	const description = e.target.description.value;

  	if (e.target.checkValidity()) {
  		this.setState({ delivery_fee, description, purchase_amount, stage: 5 });
  	}
  }

  submitCustomerInfo = e => {
  	e.preventDefault();

  	const customer_name = e.target.customer_name.value;
  	const customer_email = e.target.customer_email.value;
  	const customer_phone = e.target.customer_phone.value;

  	if (e.target.checkValidity()) {
  		this.setState({ customer: { customer_name, customer_email, customer_phone } }, () => {
  			if (this.state.type === "service") {
  				this.setState({ stage: 6 });
  			}
  		});
  	}
  }

  removeMilestone = index => {
  	let milestones = [...this.state.milestones];
  	milestones = milestones.filter((o, i) => i !== index);
  	this.setState({ milestones });
  }

  render() {
  	const { stage, type, milestones } = this.state;
  	return (
  		<section className="section">
  			<div className="container">
  				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  					{stage === 0 && (
  						<form name="invoice-type" onSubmit={this.submitInvoiceType}>
  							<h4 className="section-title">Type Of Invoice</h4>
  							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
  									<input
  										id="invoice_type_good"
  										type="radio"
  										name="invoice_type"
  										value="goods"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="invoice_type_good">Good / Marchandise</label>
  									<p>.</p>
  								</div>
  								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
  									<input
  										id="invoice_type_service"
  										type="radio"
  										name="invoice_type"
  										value="service"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="invoice_type_service">Service / Milestone</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  							</div>
  							<div className="clearfix" />
  							<div className="form-buttons">
  								<input
  									name="invoice-type-submit"
  									type="submit"
  									value="NEXT"
  									id="send"
  									className="text-submit"
  								/>
  							</div>
  						</form>
  					)}
  					{stage === 1 && (
  						<form name="delivery-fee" onSubmit={this.submitDeliveryType}>
  							<h4 className="section-title">Who Pays Delivery Fee</h4>
  							<br />
  							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
  									<input
  										id="who_pays_delivery_fee_customer"
  										type="radio"
  										name="who_pays_delivery_fee"
  										value="buyer"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="who_pays_delivery_fee_customer">Buyer</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
  									<input
  										id="who_pays_delivery_fee_both"
  										type="radio"
  										name="who_pays_delivery_fee"
  										value="both"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="who_pays_delivery_fee_both">Both (50 / 50)</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
  									<input
  										id="who_pays_delivery_fee_marchant"
  										type="radio"
  										name="who_pays_delivery_fee"
  										value="marchant"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="who_pays_delivery_fee_marchant">Marchant</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  							</div>
  							<div className="clearfix" />
  							<div className="form-buttons">
  								<input
  									name="back-button"
  									type="button"
  									value="BACK"
  									className="text-submit-inverse"
  									onClick={() => this.setState({ stage: 0 })}
  								/>
  								<input
  									name="invoice-type-delivery"
  									type="submit"
  									value="NEXT"
  									id="send"
  									className="text-submit"
  								/>
  							</div>
  						</form>
  					)}
  					{stage === 3 && (
  						<form name="pipepay-fee" onSubmit={this.submitPipepayType}>
  							<h4 className="section-title">Who Pays PipePay Fee</h4>
  							<br />
  							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
  									<input
  										id="who_pays_pipepay_fee_customer"
  										type="radio"
  										name="who_pays_pipepay_fee"
  										value="buyer"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="who_pays_pipepay_fee_customer">Buyer</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
  									<input
  										id="who_pays_pipepay_fee_both"
  										type="radio"
  										name="who_pays_pipepay_fee"
  										value="both"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="who_pays_pipepay_fee_both">Both (50 / 50)</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
  									<input
  										id="who_pays_pipepay_fee_marchant"
  										type="radio"
  										name="who_pays_pipepay_fee"
  										value="marchant"
  										required
  									/>
                    &nbsp;&nbsp;
  									<label htmlFor="who_pays_pipepay_fee_marchant">Marchant</label>
  									<p>
                      Fugiat voluptate nisi magna pariatur incididunt occaecat aliqua veniam
                      proident.
  									</p>
  								</div>
  							</div>
  							<div className="clearfix" />
  							<div className="form-buttons">
  								<input
  									name="back-button"
  									type="button"
  									value="BACK"
  									className="text-submit-inverse"
  									onClick={() => this.setState({ stage: 1 })}
  								/>
  								<input
  									name="invoice-type-pipepay"
  									type="submit"
  									value="NEXT"
  									id="send"
  									className="text-submit"
  								/>
  							</div>
  						</form>
  					)}
  					{stage === 4 && (
  						<form name="purchase-form" onSubmit={this.submitPurchaseInfo}>
  							<h4 className="section-title">Purchase Info</h4>
  							<br />
  							<label htmlFor="c-email">Description</label>
  							<textarea
  								name="description"
  								className="text-input area"
  								placeholder="Tell us something about the purchased good"
  								required
  							/>
  							<br />
  							<br />
  							<label htmlFor="c-email">Purchase Amount</label>
  							<input
  								type="number"
  								name="purchase_amount"
  								placeholder="What's the total price of the item purchased"
  								className="text-input"
  								required
  							/>
  							<br />
  							<br />
  							<label htmlFor="c-email">Delivery Fee</label>
  							<input
  								type="number"
  								name="delivery_fee"
  								placeholder="Delivery Price"
  								className="text-input"
  								required
  							/>
  							<br />
  							<br />
  							<div className="clearfix" />
  							<div className="form-buttons">
  								<input
  									name="back-button"
  									type="button"
  									value="BACK"
  									className="text-submit-inverse"
  									onClick={() => this.setState({ stage: 3 })}
  								/>
  								<input
  									name="invoice-type-purchase"
  									type="submit"
  									value="NEXT"
  									id="send"
  									className="text-submit"
  								/>
  							</div>
  						</form>
  					)}
  					{stage === 5 && (
  						<form name="costomer-form" onSubmit={this.submitCustomerInfo}>
  							<h4 className="section-title">Customer Info</h4>
  							<br />
  							<label htmlFor="c-name">Customer Name</label>
  							<input
  								type="text"
  								name="customer_name"
  								placeholder="Customer Name"
  								id="c-name"
  								className="text-input"
  								required
  							/>
  							<br />
  							<br />
  							<label htmlFor="c-phone">Customer Phone</label>
  							<input
  								type="text"
  								name="customer_phone"
  								placeholder="Customer Phone Number"
  								id="c-phone"
  								className="text-input"
  								required
  							/>
  							<br />
  							<br />
  							<label htmlFor="c-email">Customer Email</label>
  							<input
  								type="text"
  								name="customer_email"
  								placeholder="Customer Email"
  								id="c-email"
  								className="text-input"
  								required
  							/>
  							<div className="clearfix" />
  							<div className="form-buttons">
  								<input
  									name="back-button"
  									type="button"
  									value="BACK"
  									className="text-submit-inverse"
  									onClick={
  										type === "goods"
  											? () => this.setState({ stage: 4 })
  											: () => this.setState({ stage: 0 })
  									}
  								/>
  								<input
  									type="submit"
  									value={type === "goods" ? "DONE" : "NEXT"}
  									id="send"
  									className="text-submit"
  								/>
  							</div>
  						</form>
  					)}
  					{stage === 6 && (
  						<form name="milstone-form">
  							<h4 className="section-title">Milestones</h4>
  							<br />
  							<ol className="milestones">
  								{milestones.map(({ description, amount, dueDate }, i) => {
  									return (
  										<li className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={i}>
  											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
  												<label className="text-center">Amount</label>
  												<input
  													type="number"
  													value={amount}
  													name="milestone-amount"
  													placeholder="Amount"
  													className="text-input"
  													required
  													onChange={e => {
  														const milestones = this.state.milestones;
  														milestones[i].amount = Number(e.target.value);
  														this.setState({ milestones });
  													}}
  												/>
  											</div>
  											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
  												<label className="text-center">Description</label>
  												<input
  													type="text"
  													value={description}
  													name="milestone-name"
  													placeholder="Name or Description"
  													id="c-name"
  													className="text-input"
  													required
  													onChange={e => {
  														const milestones = this.state.milestones;
  														milestones[i].description = e.target.value;
  														this.setState({ milestones });
  													}}
  												/>
  											</div>
  											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
  												<label className="text-center">Due Date</label>
  												<input
  													type="date"
  													value={dueDate}
  													id="milestone-due-date"
  													name="milestone-dueDate"
  													placeholder="Due Date"
  													className="text-input"
  													required
  													onChange={e => {
  														const milestones = this.state.milestones;
  														milestones[i].dueDate = e.target.value;
  														this.setState({ milestones });
  													}}
  												/>
  											</div>
  											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
  												<button
  													className="milestone-remove-btn"
  													onClick={e => {
  														e.preventDefault();
  														this.removeMilestone(i);
  													}}
  												>
                            REMOVE
  												</button>
  											</div>
  										</li>
  									);
  								})}
  							</ol>
  							<button
  								className="add-milestone-btn"
  								onClick={e => {
  									e.preventDefault();
  									this.setState({
  										milestones: this.state.milestones.concat({
  											description: "",
  											amount: 0,
  											dueDate: "",
  										}),
  									});
  								}}
  							>
                  Add Milestone
  							</button>
  							<div className="clearfix" />
  							<div className="form-buttons">
  								<input
  									name="back-button"
  									type="button"
  									value="BACK"
  									className="text-submit-inverse"
  									onClick={() => this.setState({ stage: 5 })}
  								/>
  								<input type="submit" value="DONE" id="send" className="text-submit" />
  							</div>
  						</form>
  					)}
  				</div>
  			</div>
  		</section>
  	);
  }
}

export default NewInvoice;
