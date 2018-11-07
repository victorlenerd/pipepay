//@flow
import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
import { subHours, distanceInWords } from "date-fns";
import NProgress from "nprogress";

require("intersection-observer");

type Props = {
	history: RouterHistory,
	user: {
		token: string
	}
};

type Invoice = {
	totalPrice: number,
	created_at: Date,
	customerName: string,
	status: string,
	_id: string
};

type State = {
	pending: number,
	accepted: number,
	sent: number,
	from: ?null,
	to: ?null,
	limit: number,
	page: number,
	prevY: number,
	invoices: Array<Invoice>
};

class Dashboard extends React.PureComponent<Props, State> {
	state = {
		from: null,
		to: null,
		invoices: [],
		accepted: 0,
		pending: 0,
		sent: 0,
		prevY: 0,
		limit: 10,
		page: 1
	};

	componentDidMount() {
		this.fetchInvoices();

		var options = {
			root: null, // Page as root
			rootMargin: "0px",
			threshold: 1.0
		};

		this.listInvoices = [];

		// Create an observer
		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this), //callback
			options
		);
	}

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		console.log("y", y);
		if (this.state.prevY > y) {
			this.setState({ page: this.state.page + 1 });
			this.fetchInvoices();
		}

		this.setState({ prevY: y });
	}

	fetchInvoices = () => {
		const { user } = this.props;
		const { from, to, limit, page } = this.state;
		let url = `/api/invoice?limit=${limit}&page=${page}`;

		if (to && from) {
			url += `&from=${from}&to=${to}`;
		}

		NProgress.start();

		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`
			}
		})
			.then(res => res.json())
			.then(({ success, data }) => {
				NProgress.done();
				if (success) {
					const { invoices } = data;
					this.setState(
						{
							invoices: [...this.state.invoices, ...invoices],
							accepted: invoices.reduce((pv, cv) => {
								return cv.status === "accepted" ? pv + cv.totalPrice : pv;
							}, 0),
							pending: invoices.reduce((pv, cv) => {
								return cv.status === "paid" ? pv + cv.totalPrice : pv;
							}, 0),
							sent: invoices.reduce((pv, cv) => {
								return cv.status === "sent" ? pv + cv.totalPrice : pv;
							}, 0)
						},
						() => {
							this.observer.disconnect();
							this.observer.observe(
								this.listInvoices[this.listInvoices.length - 1]
							);
						}
					);
				} else {
					this.props.history.push("/invoices");
				}
			});
	};

	openInvoice = invoice => {
		this.props.history.push(`/invoice/${invoice._id}`, { invoice });
	};

	setQuery = q => {
		let hours = 0;

		if (q === "all") {
			return this.setState({ invoices: [], to: null, from: null }, () => {
				this.fetchInvoices();
			});
		}

		if (q === "day") hours = 24;
		if (q === "week") hours = 168;
		if (q === "month") hours = 672;
		if (q === "year") hours = 8760;

		this.setState(
			{ invoices: [], to: new Date(), from: subHours(new Date(), hours) },
			() => {
				this.fetchInvoices();
			}
		);
	};

	render() {
		return (
			<section className="section">
				<div className="payments-summary">
					<div className="container">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<p className="filter-text">Filter Transactions</p>
								<select
									className="transaction-select"
									onChange={e => this.setQuery(e.target.value)}
								>
									<option value="all">All</option>
									<option value="day">Today</option>
									<option value="week">Past Week</option>
									<option value="month">Past Month</option>
									<option value="year">Past Year</option>
								</select>
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
								<p>Sent</p>
								<h3 className="pending-transactions-amount">
									&#x20A6;
									{this.state.sent}
								</h3>
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
								<p>Paid</p>
								<h3 className="pending-transactions-amount">
									&#x20A6;
									{this.state.pending}
								</h3>
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
								<p>Approved</p>
								<h3 className="pending-transactions-amount">
									&#x20A6;
									{this.state.accepted}
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="row">
							<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
								<input
									type="text"
									className="search-invoice"
									placeholder="Search by name, email or phone number"
								/>
							</div>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
							<ul className="invoices" type="none">
								{this.state.invoices.length > 0 ? (
									this.state.invoices.map((invoice, i) => {
										return (
											<li
												ref={r => (this.listInvoices[i] = r)}
												key={i}
												onClick={() => this.openInvoice(invoice)}
											>
												<div className="pull-left">
													<h4>{invoice.customerName}</h4>
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
											</li>
										);
									})
								) : (
									<h3>You have not sent out any invoices yet</h3>
								)}
							</ul>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default withRouter(Dashboard);
