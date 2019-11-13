import React from "react";

import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import NProgress from "nprogress";

import WhoPaysFee from "./whoPaysFee";
import ChooseType from "./chooseType";
import Milestones from "./milestones";
import PurchaseInfo from "./purchaseInfo";
import CustomerInfo from "./customerInfo";
import Summary from "./summary";
import Status from "../../components/status";

type State = {
	stage: number,
	submitted: boolean,
	canSubmit: boolean,
	type: null | string,
	category: string;
	submittingInvoice: boolean,
	whoPaysDeliveryFee: null | string,
	whoPaysPipepayFee: null | string,
	delivery_fee: null | string,
	description: null | string,
	purchase_amount: null | string,
	customerInfo: null | string,
	status: null | string,
	milestones: [
		{
			description: string,
			amount: string,
			dueDate: string
		}
	]
};

type Props = {
	user: {},
};

class NewInvoice extends React.Component<Props & RouteComponentProps> {

	state: State = {
		stage: 1,
		submitted: false,
		canSubmit: false,
		type: "good",
		category: null,
		whoPaysDeliveryFee: null,
		whoPaysPipepayFee: null,
		delivery_fee: null,
		description: null,
		purchase_amount: null,
		customerInfo: null,
		status: null,
		submittingInvoice: false,
		milestones: [
			{
				description: "",
				amount: "",
				dueDate: ""
			}
		]
	};

	submitInvoiceType = e => {
		e.preventDefault();
		const invoice_type = e.target.invoice_type.value;
		if (e.target.checkValidity()) {
			this.setState({
				type: invoice_type,
				stage: invoice_type === "good" ? 1 : 5
			});
		}
	};

	submitDeliveryType = e => {
		e.preventDefault();
		const whoPaysDeliveryFee = e.target.who_pays_delivery_fee.value;
		const whoPaysPipepayFee = e.target.who_pays_pipepay_fee.value;

		if (e.target.checkValidity()) {
			this.setState({ whoPaysDeliveryFee, whoPaysPipepayFee, stage: 4 });
		}
	};

	submitPurchaseInfo = e => {
		e.preventDefault();

		const category = e.target.category.value;
		const purchase_amount = e.target.purchase_amount.value;
		const delivery_fee = e.target.delivery_fee.value;
		const description = e.target.description.value;

		if (e.target.checkValidity()) {
			this.setState({
				category,
				delivery_fee,
				description,
				purchase_amount,
				stage: 5
			});
		}
	};

	submitCustomerInfo = (e: { preventDefault: () => void, target: any }) => {
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
				dueDate: ""
			})
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
				<>
					<WhoPaysFee
						type="Delivery"
						submit={this.submitDeliveryType}
						back={() => this.setState({ stage: 0 })}
					/>
				</>
			);

		if (stage === 4)
			return (
				<PurchaseInfo
					submit={this.submitPurchaseInfo}
					back={() => this.setState({ stage: 1 })}
				/>
			);

		if (stage === 5)
			return (
				<CustomerInfo
					// @ts-ignore:
					submit={this.submitCustomerInfo}
					updateStage={stage => this.setState({ stage })}
				/>
			);

		if (stage === 6)
			return (
				<Milestones
					// @ts-ignore:
					milestones={this.state.milestones}
					submit={this.submit}
					back={() => this.setState({ stage: 5 })}
					// @ts-ignore:
					addMilestone={this.addMilestone}
					removeMilestone={this.removeMilestone}
					updateMilestone={this.updateMilestone}
				/>
			);
	};

	cancelSubmit = () => {
		this.setState({
			canSubmit: false
		});
	};

	submitInvoice = () => {
		const {
			// @ts-ignore:
			user: { token }
		} = this.props;
		const {
			type,
			category,
			whoPaysPipepayFee,
			whoPaysDeliveryFee,
			delivery_fee,
			description,
			purchase_amount,
			milestones,
			// @ts-ignore:
			customerInfo: { customerName, customerEmail, customerPhone }
		} = this.state;

		const data = {
			type,
			category,
			customerName,
			customerEmail,
			customerPhone
		};

		if (type === "good") {
			// @ts-ignore:
			data.whoPaysPipepayFee = whoPaysPipepayFee;
			// @ts-ignore:
			data.whoPaysDeliveryFee = whoPaysDeliveryFee;
			// @ts-ignore:
			data.purchaseAmount = purchase_amount;
			// @ts-ignore:
			data.deliveryAmount = delivery_fee;
			// @ts-ignore:
			data.description = description;
		} else {
			// @ts-ignore:
			data.description = milestones[0].description;
			// @ts-ignore:
			data.milestones = milestones;
		}
		this.setState({ submittingInvoice: true });
		NProgress.start();
		fetch("/api/invoice", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(({ success }) => {
				NProgress.done();
				this.setState({
					submittingInvoice: false,
					submitted: true,
					status: success
				});
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
			submittingInvoice,
			submitted
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
									// @ts-ignore:
									customerInfo={customerInfo}
									disabled={submittingInvoice}
									data={
										type === "service"
											// @ts-ignore:
											? { milestones }
											: {
													purchase_amount,
													delivery_fee,
													whoPaysDeliveryFee,
													whoPaysPipepayFee
											  }
									}
								/>
							) : (
								this.getStageView()
							)}
						</div>
					) : (
						<Status
							// @ts-ignore:
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
