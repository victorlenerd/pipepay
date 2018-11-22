import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
// <div className="col-lg-6 col-md-6 col-sm-12 col-12">
// <div className="rate-container">
// 	<div className="rate-info">
// 		<h2>5%</h2>
// 		<p className="trans">Per Transaction.</p>
// 		<br />
// 		<br />
// 		<p>&#x20A6;50 Bank Charges Apply.</p>
// 	</div>
// </div>
// </div>

class Home extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<section className="intro">
					<div className="image-holder">
						<div className="intro-content-container">
							<div className="container">
								<div className="row noPad">
									<div className="col-lg-6 col-md-6 col-sm-12 col-12 noPad">
										<div className="description">
											<div className="warning">
												<h2>
													Dont ever buy or sell anything online without Pipepay.
												</h2>
											</div>
											<div className="about">
												<p>
													Buy or sell anything online using Pipepay without
													risk. Really secure payment. Never miss a sale.
												</p>
											</div>
											<div className="sign-buttons">
												<Link to="/signup" className="sign-button signIn">
													Get Started
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="howItWorks">
					<div className="green-green">
						<div className="pay-services-container" />
					</div>
					<div className="container">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="pay-goods">
								<p>Complete protection for merchandise transactions</p>
								<ol className="ol">
									<li>Buyer and seller agree on terms</li>
									<li>Buyer pays PipePay.africa</li>
									<li>Seller ships the merchandise</li>
									<li>Buyer inspects & approves goods</li>
									<li>PipePay.africa pays the seller</li>
								</ol>
							</div>
						</div>
					</div>
					<div className="clearfix" />
				</section>
				<section className="contacts">
					<div className="container">
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 noPad shrink">
							<div className="icons" />
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 noPad shrink">
							<div className="contact-info">
								<h5>Mail:</h5>
								<p>hello@pippay.africa</p>
							</div>
							<div className="contact-info">
								<h5>Phone:</h5>
								<p>+234 909 861 2833</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 noPad shrink">
							<div className="contact-info">
								<h5>Address:</h5>
								<p>Lagos, Nigeria.</p>
							</div>
							<div className="contact-info">
								<h5>Phone:</h5>
								<p>+234 815 050 1601</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 noPad shrink">
							<h4>Pipepay</h4>
							<p>
								We Help marchants not miss any sale, by proving an easy escrow
								service for their customers
							</p>
							<br />
							<Footer />
						</div>
					</div>
					<br />
					<br />
					<p className="text-center">
						© Pipepay.africa {new Date().getFullYear()}
					</p>
				</section>
			</React.Fragment>
		);
	}
}

export default Home;
