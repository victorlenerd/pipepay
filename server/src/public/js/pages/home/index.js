import React from "react";
// import "../../styles/home.css";
import { Link } from "react-router-dom";
import Header from "../../components/header";

class Home extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<section className="intro">
					<Header />
					<div className="image-holder">
						<div className="intro-content-container">
							<div className="intro-container">
								<div className="row noPad">
									<div className="col-lg-6 col-md-6 col-sm-12 col-12 noPad">
										<div className="description">
											<div className="warning">
												<h2>Dont ever buy or sell anything online without Pipepay.</h2>
											</div>
											<div className="about">
												<p>Buy or sell anything online using Pipepay without risk. Really secure payment.</p>
											</div>
											<div className="sign-buttons">
												<Link to="/signup" className="sign-button signIn">Get Started</Link>
											</div>
										</div>
									</div>

									<div className="col-lg-6 col-md-6 col-sm-12 col-12">
										<div className="rate-container">
											<div className="rate-info">
												<h2>5%</h2>
												<p className="trans">Per Transaction.</p>
												<br />
												<br />
												<p>&#x20A6;50 Bank Charges Apply.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="howItWorks">
					<div className="pay-goods-container">
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

					<div className="pay-services-container">
						<div className="pay-services">
							<p>Complete protection for milestone transactions.</p>
							<ol className="ol">
								<li>Buyer and seller agree on terms</li>
								<li>Buyer pays PipePay.africa</li>
								<li>Seller provides the service</li>
								<li>Buyer approves the milestone</li>
								<li>PipePay.africa pays the seller</li>
							</ol>
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
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 noPad shrink">
							<div className="contact-info">
								<h5>Phone:</h5>
								<p>+234 909 861 2833</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 noPad shrink">
							<div className="contact-info">
								<h5>Address:</h5>
								<p>Akoka, Lagos, Nigeria.</p>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Home;
