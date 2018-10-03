import React from "react";

import WhoPaysFee from "./whoPaysFee";
import ChooseType from "./chooseType";
import Milestones from "./milestones";
import PurchaseInfo from "./purchaseInfo";
import CustomerInfo from "./customerInfo";

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

	addMilestone = e => {
		e.preventDefault();
		this.setState({
			milestones: this.state.milestones.concat({
				description: "",
				amount: "",
				dueDate: "",
			}),
		});
	}

	removeMilestone = index => {
		let milestones = [...this.state.milestones];
		milestones = milestones.filter((o, i) => i !== index);
		this.setState({ milestones });
	}

	updateMilestone = milestones => {
		this.setState({ milestones });
	}

	submit = () => {}

	render() {
		const { stage, type, milestones } = this.state;
		return (
			<section className="section">
				<div className="container">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						{stage === 0 && <ChooseType submit={this.submitInvoiceType} />}
						{stage === 1 && <WhoPaysFee 
							type="Delivery"
							submit={this.submitDeliveryType}
							back={() => this.setState({ stage: 0 })} />}
						{stage === 3 && <WhoPaysFee 
							type="PipePay" 
							submit={this.submitPipepayType} 
							back={() => this.setState({ stage: 1 })} />}
						{stage === 4 && <PurchaseInfo 
							submit={this.submitPurchaseInfo} 
							back={() => this.setState({ stage: 3 })} />}
						{stage === 5 && <CustomerInfo 
							submit={this.submitCustomerInfo} 
							updateStage={(stage)=> this.setState({ stage })} />}
						{stage === 6 && <Milestones
							milestones={this.state.milestones}
							submit={this.submit}
							back={() => this.setState({ stage: 5 })}
							addMilestone={this.addMilestone}
							removeMilestone={this.removeMilestone}
							updateMilestone={this.updateMilestone}
						/>}
					</div>
				</div>
			</section>
		);
	}
}

export default NewInvoice;
