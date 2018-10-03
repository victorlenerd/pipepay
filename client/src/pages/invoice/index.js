//@flow
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

type Props = {
  history: Object
};

type State = {
  name: String
}

class Invoice extends React.PureComponent<Props, State> {
  openReport = () => {
  	this.props.history.push("report");
  }

  render() {
  	return (
  		<section className="section">
  			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  				<div className="container">
  					<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 invoice-left">
  						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  							<div className="pull-left">
  								<label>Customer Name</label>
  								<h4>Victor Nwaokocha</h4>
  							</div>
  							<div className="pull-right">
  								<div className="invoice-timeago">6 Days Ago</div>
  								<div className="invoice-price accepted">&#x20A6; 6000</div>
  							</div>
  						</div>
  						<div className="clearfix" />
  						<br />
  						<br />
  						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  							<div className="pull-left">
  								<label>Phone Number</label>
  								<h4>09098612833</h4>
  							</div>
  							<div className="pull-right">
  								<label>Email</label>
  								<h4>vnwaokocha@gmail.com</h4>
  							</div>
  							<div className="clearfix" />
  						</div>
  						<div className="clearfix" />
  						<br />
  						<br />
  						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  							<div className="pull-left">
  								<label>Who Pays Delivery Fee</label>
  								<h4>Marchant</h4>
  							</div>
  							<div className="pull-right">
  								<label>Who Pays PipePay Fee</label>
  								<h4>Marchant</h4>
  							</div>
  						</div>
  						<div className="clearfix" />
  						<br />
  						<br />
  						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  							<div className="pull-left">
  								<label>Total Milestones</label>
  								<h4>3</h4>
  							</div>
  							<div className="pull-right">
  								<label>Completed Milestones</label>
  								<h4>0</h4>
  							</div>
  						</div>
  					</div>
  					<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
  						<p className="invoice-action-hint">
                Once the marchandise as been delivered. Click this button to have the marchant
                confirm satisfaction and have the purchase amount sent to you.
  						</p>
  						<button className="invoice-payment-request-btn">Request Payment</button>

  						<p className="invoice-action-hint">
                Has the marchandise been delivered to the buyer? and the buyer is yet to respond to
                the payment request? Report the issue and our agents would investigate.
  						</p>
  						<button className="invoice-payment-report-btn" onClick={this.openReport}>
                Report Issue
  						</button>
  					</div>
  				</div>
  			</div>
  		</section>
  	);
  }
}

export default withRouter(Invoice);
