import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class Dashboard extends React.PureComponent {
	openInvoice = () => {
		this.props.history.push("/invoice");
	}

	render() {
		return (
			<section className="section">
				<div className="payments-summary">
					<div className="container">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-sm-2 col-xs-2">
								<p className="filter-text">Filter Transactions</p>
								<select className="transaction-select">
									<option value="week">Past Day</option>
									<option value="week">Past Week</option>
									<option value="month">Past Month</option>
									<option value="year">Past Year</option>
								</select>
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
								<p>Approved</p>
								<h3 className="pending-transactions-amount">&#x20A6;0</h3>
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
								<p>Pending</p>
								<h3 className="pending-transactions-amount">&#x20A6;0</h3>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-2 col-xs-2">
								<Link to="newinvoice" className="pbtn pull-right text-center">Create New Invoice</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="row">
							<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
								<input type="text" className="search-invoice" placeholder="Search by name, email or phone number" />
							</div>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
							<ul className="invoices" type="none">
								<li onClick={this.openInvoice}>
									<div className="pull-left">
										<h4>Victor Nwaokocha</h4>
										<div className="invoice-phone">09098612833 | vnwaokocha@gmail.com</div>
									</div>
									<div className="pull-right">
										<div className="invoice-timeago">6 Days Ago</div>
										<div className="invoice-price accepted">&#x20A6; 6000</div>
									</div>
									<div className="clearfix" />
								</li>
								<li>
									<div className="pull-left">
										<h4>Victor Nwaokocha</h4>
										<div className="invoice-phone">09098612833 | vnwaokocha@gmail.com</div>
									</div>
									<div className="pull-right">
										<div className="invoice-timeago">6 Days Ago</div>
										<div className="invoice-price pending">&#x20A6; 6000</div>
									</div>
									<div className="clearfix" />
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

Dashboard.propTypes = {
	history: PropTypes.object,
};

export default withRouter(Dashboard);
