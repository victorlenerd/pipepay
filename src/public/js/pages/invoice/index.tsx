import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import NProgress from "nprogress";

type Props = {
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
	invoice: null | {
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
		whoPaysPipePayFee: boolean,
		milestones: [Milestone]
	},
	requestSentSuccess: boolean,
	requestError: string,
	disputeError: string,
	requestSentSuccessMessage: string
};

class Invoice extends React.PureComponent<Props & RouteComponentProps, State> {
	state = {
		invoice: null,
		requestSentSuccess: false,
		disputeError: "",
		requestError: "",
		requestSentSuccessMessage: ""
	};

	componentDidMount() {
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
								invoice: Object.assign({}, this.state.invoice, invoiceUpate),
								requestSentSuccess: true,
								requestSentSuccessMessage: `Request for milestone ${nextMilestonePaymentIndex +
									1} has been sent!`
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
		const {
			invoice,
			requestSentSuccess,
			requestSentSuccessMessage
		} = this.state;

		if (!invoice) return null;

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
									<div className="invoice-timeago"></div>
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
										<h4>&#x20A6;{invoice.deliveryAmount}</h4>
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
									<h4>&#x20A6;{invoice.pipePayFee}</h4>
								</div>
							</div>
							<div className="clearfix" />
							<br />
							<br />
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left">
										<label>Who Pays Delivery Fee</label>
										<h4>{invoice.whoPaysDeliveryFee.toUpperCase()}</h4>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Who Pays PipePay Fee</label>
										<h4>{invoice.whoPaysPipePayFee.toUpperCase()}</h4>
									</div>
								</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							{invoice.status === "paid" &&
								requestSentSuccess && (
									<div className="alert alert-success text-center">
										{requestSentSuccessMessage}
									</div>
								)}
							{invoice.status === "paid" &&
								invoice.requested === false &&
								invoice.disputed === false && (
									<>
										<p className="invoice-action-hint">
											Once the merchandise as been delivered. Click this button
											to have the merchant confirm satisfaction and have the
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
								invoice.requested === true && (
									<>
										<h3 className="success-text">Request Sent</h3>
										<button
											className="invoice-payment-request-btn"
											onClick={this.sendRequest}
										>
											Re-Send Request Payment
										</button>
									</>
								)}
							{invoice.status === "paid" &&
								invoice.disputed === false && (
									<>
										<p className="invoice-action-hint">
											Has the merchandise been delivered to the buyer? and the
											buyer is yet to respond to the payment request? Report the
											issue and our agents would investigate.
										</p>
										<button
											className="invoice-payment-report-btn"
											onClick={this.openReport}
										>
											Open Dispute
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

// @ts-ignore:
export default withRouter(Invoice);
