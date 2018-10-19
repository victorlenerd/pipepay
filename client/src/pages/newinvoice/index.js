//@flow
import React from "react";

import { withRouter } from "react-router-dom";
import AppContext from "contexts/app.context";
import NProgress from "nprogress";
import WithHeader from "containers/header.container";

import WhoPaysFee from "./whoPaysFee";
import ChooseType from "./chooseType";
import Milestones from "./milestones";
import PurchaseInfo from "./purchaseInfo";
import CustomerInfo from "./customerInfo";
import Summary from "./summary";
import Status from "./status";

type State = {
	stage: number,
	submitted: boolean,
	canSubmit: boolean,
	type: ?null,
	whoPaysDeliveryFee: ?null,
	whoPaysPipepayFee: ?null,
	delivery_fee: ?null,
	description: ?null,
	purchase_amount: ?null,
	customerInfo: ?null,
	status: ?null,
	milestones: [
		{
			description: string,
			amount: string,
			dueDate: string,
		},
	],
};

type Props = {
	user: object,
	history: {
		push: () => void,
	},
};

class NewInvoice extends React.Component<Props, State> {
	state = {
		stage: 0,
		submitted: false,
		canSubmit: false,
		type: null,
		whoPaysDeliveryFee: null,
		whoPaysPipepayFee: null,
		delivery_fee: null,
		description: null,
		purchase_amount: null,
		customerInfo: null,
		status: null,
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

	submitInvoiceType = e => {
		e.preventDefault();
		const invoice_type = e.target.invoice_type.value;
		if (e.target.checkValidity()) {
			this.setState({
				type: invoice_type,
				stage: invoice_type === "good" ? 1 : 5,
			});
		}
	};

	submitDeliveryType = e => {
		e.preventDefault();
		const whoPaysDeliveryFee = e.target.who_pays_delivery_fee.value;
		if (e.target.checkValidity()) {
			this.setState({ whoPaysDeliveryFee, stage: 3 });
		}
	};

	submitPipepayType = e => {
		e.preventDefault();
		const whoPaysPipepayFee = e.target.who_pays_pipepay_fee.value;
		if (e.target.checkValidity()) {
			this.setState({ whoPaysPipepayFee, stage: 4 });
		}
	};

	submitPurchaseInfo = e => {
		e.preventDefault();

		const purchase_amount = e.target.purchase_amount.value;
		const delivery_fee = e.target.delivery_fee.value;
		const description = e.target.description.value;

		if (e.target.checkValidity()) {
			this.setState({ delivery_fee, description, purchase_amount, stage: 5 });
		}
	};

	submitCustomerInfo = e => {
		e.preventDefault();

		const customerName = e.target.customerName.value;
		const customerEmail = e.target.customerEmail.value;
		const customerPhone = e.target.customerPhone.value;

		if (e.target.checkValidity()) {
			this.setState(
				{ customerInfo: { customerName, customerEmail, customerPhone } },
				() => {
					if (this.state.type === "service") {
						this.setState({ stage: 6 });
					} else {
						this.setState({ canSubmit: true });
					}
				}
			);
		}
	};

	addMilestone = e => {
		e.preventDefault();
		this.setState({
			milestones: this.state.milestones.concat({
				description: "",
				amount: "",
				dueDate: "",
			}),
		});
	};

	removeMilestone = index => {
		let milestones = [...this.state.milestones];
		milestones = milestones.filter((o, i) => i !== index);
		this.setState({ milestones });
	};

	updateMilestone = milestones => {
		this.setState({ milestones });
	};

	submit = e => {
		e.preventDefault();
		if (e.target.checkValidity()) {
			this.setState({ canSubmit: true });
		}
	};

	getStageView = () => {
		const { stage } = this.state;

		if (stage === 0) return <ChooseType submit={this.submitInvoiceType} />;

		if (stage === 1)
			return (
				<WhoPaysFee
					type="Delivery"
					submit={this.submitDeliveryType}
					back={() => this.setState({ stage: 0 })}
				/>
			);

		if (stage === 3)
			return (
				<WhoPaysFee
					type="PipePay"
					submit={this.submitPipepayType}
					back={() => this.setState({ stage: 1 })}
				/>
			);

		if (stage === 4)
			return (
				<PurchaseInfo
					submit={this.submitPurchaseInfo}
					back={() => this.setState({ stage: 3 })}
				/>
			);

		if (stage === 5)
			return (
				<CustomerInfo
					submit={this.submitCustomerInfo}
					updateStage={stage => this.setState({ stage })}
				/>
			);

		if (stage === 6)
			return (
				<Milestones
					milestones={this.state.milestones}
					submit={this.submit}
					back={() => this.setState({ stage: 5 })}
					addMilestone={this.addMilestone}
					removeMilestone={this.removeMilestone}
					updateMilestone={this.updateMilestone}
				/>
			);
	};

	cancelSubmit = () => {
		this.setState({
			canSubmit: false,
		});
	};

	submitInvoice = () => {
		const {
			user: { token },
		} = this.props;
		const {
			type,
			whoPaysPipepayFee,
			whoPaysDeliveryFee,
			delivery_fee,
			description,
			purchase_amount,
			milestones,
			customerInfo: { customerName, customerEmail, customerPhone },
		} = this.state;

		const data = {
			type,
			customerName,
			customerEmail,
			customerPhone,
		};

		if (type === "good") {
			data.whoPaysPipepayFee = whoPaysPipepayFee;
			data.whoPaysDeliveryFee = whoPaysDeliveryFee;
			data.purchaseAmount = purchase_amount;
			data.deliveryAmount = delivery_fee;
			data.description = description;
		} else {
			data.description = milestones[0].description;
			data.milestones = milestones;
		}
		NProgress.start();
		fetch("/api/invoice", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(({ success }) => {
				NProgress.done();
				this.setState({ submitted: true, status: success });
			});
	};

	render() {
		const {
			purchase_amount,
			delivery_fee,
			whoPaysDeliveryFee,
			whoPaysPipepayFee,
			customerInfo,
			stage,
			type,
			milestones,
			canSubmit,
			status,
			submitted,
		} = this.state;

		return (
			<section className="section">
				<div className="container">
					{!submitted ? (
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							{canSubmit ? (
								<Summary
									type={type}
									back={this.cancelSubmit}
									submit={() => this.submitInvoice()}
									customerInfo={customerInfo}
									data={
										type === "service"
											? { milestones }
											: {
													purchase_amount,
													delivery_fee,
													whoPaysDeliveryFee,
													whoPaysPipepayFee,
											  }
									}
								/>
							) : (
								this.getStageView()
							)}
						</div>
					) : (
						<Status
							status={status}
							back={() => {
								this.props.history.push("/invoices");
							}}
						/>
					)}
				</div>
			</section>
		);
	}
}

export default withRouter(NewInvoice);
