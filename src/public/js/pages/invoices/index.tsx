import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { subHours } from "date-fns";
import NProgress from "nprogress";
import AppContext from "../../contexts/app.context";

type Props = {
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
	query: string,
	pending: number,
	accepted: number,
	sent: number,
	from ?: null,
	to ?: null,
	limit: number,
	page: number,
	total: number,
	prevY: number,
	invoices: Array<Invoice>
};

class Dashboard extends React.PureComponent<Props & RouteComponentProps> {

	state: State = {
		from: null,
		to: null,
		query: "",
		invoices: [],
		accepted: 0,
		pending: 0,
		sent: 0,
		prevY: 0,
		limit: 15,
		total: 0,
		page: 1
	};

	componentDidMount() {
		this.fetchInvoices();

		var options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0
		};

		// @ts-ignore:
		this.listInvoices = [];


		if (window) {
			import('intersection-observer').then(() => {
				// @ts-ignore:
				this.observer = new IntersectionObserver(
					this.handleObserver.bind(this), //callback
					options
				);
			});
		}
	}

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y && this.state.invoices.length < this.state.total) {
			this.setState({ page: this.state.page + 1 });
			this.fetchInvoices();
		}

		this.setState({ prevY: y });
	}

	abbreviate_number = function(num, fixed ?: number) {
		if (num === null) {
			return null;
		} // terminate early
		if (num === 0) {
			return "0";
		} // terminate early
		fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
		var b = num.toPrecision(2).split("e"), // get power
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
			c =
				k < 1
					? num.toFixed(0 + fixed)
					: (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
			d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
			e = d + ["", "K", "M", "B", "T"][k]; // append power
		return e;
	};

	fetchInvoices = () => {
		const { user } = this.props;
		const { from, to, limit, page, query } = this.state;
		let url = `/api/invoice?limit=${limit}&page=${page}`;

		if (to && from) {
			url += `&from=${from}&to=${to}`;
		}

		if (query) {
			url += `&search=${query}`;
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
					const { invoices, total } = data;
					// @ts-ignore:
					this.listInvoices = [];
					this.setState(
						{
							invoices: [...this.state.invoices, ...invoices],
							total
						},
						() => {
							this.setState(
								{
									accepted: this.state.invoices.reduce((pv, cv) => {
										return cv.status === "accepted" ? pv + cv.totalPrice : pv;
									}, 0),
									pending: this.state.invoices.reduce((pv, cv) => {
										return cv.status === "paid" ? pv + cv.totalPrice : pv;
									}, 0),
									sent: this.state.invoices.reduce((pv, cv) => {
										return cv.status === "sent" ? pv + cv.totalPrice : pv;
									}, 0)
								},
								() => {
									// @ts-ignore:
									if (this.observer) {
										// @ts-ignore:
										this.observer.disconnect();
									}
									// @ts-ignore:
									const el = this.listInvoices[this.listInvoices.length - 1];
									if (el) {
										// @ts-ignore:
										if (this.observer) {
											// @ts-ignore:
											this.observer.observe(el);
										}
									}
								}
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

	setSearchQuery = query => {
		// @ts-ignore:
		if (this.handle) clearTimeout(this.handle);
		// @ts-ignore:
		this.handle = setTimeout(() => {
			// @ts-ignore:
			clearTimeout(this.handle);
			this.setState({ query, invoices: [], page: 1 }, () => {
				this.fetchInvoices();
			});
		}, 500);
	};

	setQuery = q => {
		let hours = 0;

		if (q === "all") {
			return this.setState(
				{ page: 1, invoices: [], to: null, from: null },
				() => {
					this.fetchInvoices();
				}
			);
		}

		if (q === "day") hours = 24;
		if (q === "week") hours = 168;
		if (q === "month") hours = 672;
		if (q === "year") hours = 8760;

		this.setState(
			{
				page: 1,
				invoices: [],
				to: new Date(),
				from: subHours(new Date(), hours)
			},
			() => this.fetchInvoices()
		);
	};

	render() {
		return (
			<AppContext>
				{context => {
					// @ts-ignore:
					this.appContext = context;

					return (
						<section className="section">
							<div className="payments-summary sticky">
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
									<p>Sent</p>
									<h3 className="pending-transactions-amount">
										&#x20A6;
										{this.abbreviate_number(this.state.sent)}
									</h3>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
									<p>Paid</p>
									<h3 className="pending-transactions-amount">
										&#x20A6;
										{this.abbreviate_number(this.state.pending)}
									</h3>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
									<p>Approved</p>
									<h3 className="pending-transactions-amount">
										&#x20A6;
										{this.abbreviate_number(this.state.accepted)}
									</h3>
								</div>
							</div>
							<div className="container" style={{ marginTop: 100 }}>
								<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 spread">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
										<div className="col-lg-8 col-md-8 col-sm-12 col-xs-8">
											<input
												type="text"
												className="search-invoice"
												onChange={e => this.setSearchQuery(e.target.value)}
												placeholder="Search by name, email or phone number"
											/>
										</div>
										<div className="col-lg-2 col-md-2 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-4">
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
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<ul className="invoices" list-type="none">
											{this.state.invoices.length > 0 ? (this.state.invoices.map((invoice, i) => {
													return (
														<li
															// @ts-ignore:
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
																</div>
																<div
																	className={`invoice-price ${invoice.status}`}
																>
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
				}}
			</AppContext>
		);
	}
}

// @ts-ignore:
export default withRouter(Dashboard);
