//@flow
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import type { RouterHistory, Location } from "react-router-dom";
import { distanceInWords } from "date-fns";
import NProgress from "nprogress";

type Props = {
	history: RouterHistory,
	location: Location,
	user: {
		token: string
	},
	match: {
		params: {
			invoiceId: string
		}
	}
};

type Milestone = {
	_id: string,
	amount: number,
	requested: boolean,
	description: string,
	dueDate: Date,
	paid: boolean
};

type State = {
	invoice: {
		_id: string,
		type: string,
		customerName: string,
		created_at: string,
		totalPrice: number,
		status: string,
		requested: boolean,
		disputed: boolean,
		deliveryAmount: number,
		customerPhone: string,
		customerEmail: string,
		pipePayFee: number,
		purchaseAmount: number,
		whoPaysDeliveryFee: boolean,
		whoPaysPipepayFee: boolean,
		milestones: [Milestone]
	},
	requestError: string,
	disputeError: string
};

class Invoice extends React.PureComponent<Props, State> {
	state = {
		invoice: {}
	};

	componentWillMount() {
		const {
			history,
			location,
			match,
			user: { token }
		} = this.props;

		let invoice = location.state ? location.state.invoice : null;
		let invoiceId = match.params ? match.params.invoiceId : null;

		if (invoice) {
			this.setState({ invoice });
		} else if (!invoice && invoiceId) {
			NProgress.start();
			fetch(`/api/invoice/${invoiceId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => res.json())
				.then(({ success, data: invoice }) => {
					NProgress.done();
					if (success) return this.setState({ invoice });
					history.push("/invoices");
				});
		} else {
			history.push("/invoices");
		}
	}

	openReport = () => {
		const {
			invoice: { _id: invoiceId }
		} = this.state;

		this.props.history.push(`/report/${invoiceId}`);
	};

	completed = () => {};

	sendRequest = e => {
		const {
			invoice: { _id: invoiceId, type }
		} = this.state;
		const {
			user: { token }
		} = this.props;

		NProgress.start();
		if (type === "good") {
			fetch(`/api/request/${invoiceId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => res.json())
				.then(({ success }) => {
					if (success) {
						this.setState({
							invoice: Object.assign({}, this.state.invoice, {
								requested: true
							})
						});
					} else {
						this.setState({
							requestError: "An error occured sending the request"
						});
					}

					NProgress.done();
				});
		} else {
			let milestones = this.state.invoice.milestones;
			let nextMilestonePaymentIndex;
			let nextMilestonePayment;

			for (let i = 0; i < milestones.length; i++) {
				if (!milestones[i].paid) {
					nextMilestonePaymentIndex = i;
					nextMilestonePayment = milestones[i];
					break;
				}
			}

			let isLastMilestone =
				nextMilestonePaymentIndex === milestones.length - 1 ? true : false;

			if (nextMilestonePayment) {
				fetch(`/api/request/${invoiceId}/${nextMilestonePayment._id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
					.then(res => res.json())
					.then(({ success }) => {
						if (success) {
							let updatedMilestone = Object.assign({}, nextMilestonePayment, {
								requested: true
							});
							milestones[nextMilestonePaymentIndex] = updatedMilestone;
							let invoiceUpate = {
								milestones,
								requested: false,
								status: "paid"
							};

							if (isLastMilestone) {
								invoiceUpate.requested = true;
							}

							this.setState({
								invoice: Object.assign({}, this.state.invoice, invoiceUpate)
							});
						} else {
							this.setState({
								requestError: "An error occured sending the request"
							});
						}

						NProgress.done();
					});
			} else {
				this.setState({
					invoice: Object.assign({}, this.state.invoice, { requested: true })
				});
			}
		}
	};

	render() {
		const { invoice } = this.state;

		return (
			<section className="section">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="container">
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 invoice-left">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoice-bottom">
								<div className="pull-left">
									<h3>{invoice.customerName}</h3>
									<div className="invoice-price-main">
										&#x20A6; {invoice.totalPrice}
									</div>
								</div>
								<div className="pull-right">
									<div className="invoice-timeago">
										{distanceInWords(invoice.created_at, new Date())}
									</div>
									<div className={`invoice-price ${invoice.status}`}>
										{invoice.status}
									</div>
								</div>
								<div className="clearfix" />
							</div>
							<div className="clearfix" />
							<br />
							<br />
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoice-bottom">
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left">
									<label>Phone Number</label>
									<h4>{invoice.customerPhone}</h4>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<label>Email</label>
									<h4>{invoice.customerEmail}</h4>
								</div>
								<div className="clearfix" />
							</div>
							<div className="clearfix" />
							<br />
							<br />
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoice-bottom">
								<div
									className={
										invoice.type === "good"
											? "col-lg-4 col-md-4 col-sm-4 col-xs-12 invoice-left"
											: "col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left"
									}
								>
									<label>Payment</label>
									<h4>{invoice.purchaseAmount}</h4>
								</div>
								{invoice.type === "good" && (
									<div
										className={
											invoice.type === "good"
												? "col-lg-4 col-md-4 col-sm-4 col-xs-12 invoice-left"
												: "col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left"
										}
									>
										<label>Delivery Fee</label>
										<h4>{invoice.deliveryAmount}</h4>
									</div>
								)}
								<div
									className={
										invoice.type === "good"
											? "col-lg-4 col-md-4 col-sm-4 col-xs-12"
											: "col-lg-6 col-md-6 col-sm-6 col-xs-12"
									}
								>
									<label>PipePay Fee</label>
									<p className="hint">(Bank Charges + 5% of Payment)</p>
									<h4>{invoice.pipePayFee}</h4>
								</div>
							</div>
							<div className="clearfix" />
							<br />
							<br />
							{invoice.type === "service" ? (
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoice-bottom">
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left">
										<label>Total Milestones</label>
										<h4>{invoice.milestones.length}</h4>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Completed Milestones</label>
										<h4>{invoice.milestones.filter(i => i.paid).length}</h4>
									</div>
								</div>
							) : (
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left">
										<label>Who Pays Delivery Fee</label>
										<h4>{invoice.whoPaysDeliveryFee}</h4>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Who Pays PipePay Fee</label>
										<h4>{invoice.whoPaysPipepayFee}</h4>
									</div>
								</div>
							)}
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							{invoice.status === "paid" &&
								invoice.requested === false && (
									<>
										<p className="invoice-action-hint">
											Once the marchandise as been delivered. Click this button
											to have the marchant confirm satisfaction and have the
											purchase amount sent to you.
										</p>
										<button
											className="invoice-payment-request-btn"
											onClick={this.sendRequest}
										>
											Request Payment
										</button>
									</>
								)}
							{invoice.status === "paid" &&
								invoice.disputed === false && (
									<>
										<p className="invoice-action-hint">
											Has the marchandise been delivered to the buyer? and the
											buyer is yet to respond to the payment request? Report the
											issue and our agents would investigate.
										</p>
										<button
											className="invoice-payment-report-btn"
											onClick={this.openReport}
										>
											Report Issue
										</button>
									</>
								)}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default withRouter(Invoice);
