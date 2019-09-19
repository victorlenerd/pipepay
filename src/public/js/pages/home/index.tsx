import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import FAQ from "../../components/faq";

class Home extends React.PureComponent {
	componentDidMount() {
		// @ts-ignore:
		window.particlesJS.load("particles-js", "assets/particles.json");
		$(function() {
			$("a[href*=\\#]:not([href=\\#])").click(function() {
				if (
					location.pathname.replace(/^\//, "") ==
					// @ts-ignore:
					this.pathname.replace(/^\//, "") &&
					// @ts-ignore:
					location.hostname == this.hostname
				) {
					// @ts-ignore:
					var target = $(this.hash);
					target = target.length
						? target
						// @ts-ignore:
						: $("[name=" + this.hash.slice(1) + "]");
					if (target.length) {
						$("html,body").animate(
							{
								scrollTop: target.offset().top
							},
							1000
						);
						return false;
					}
				}
			});
		});
	}

	render() {
		return (
			<>
				<section className="intro">
					<div className="image-holder">
						<div className="intro-content-container">
							<div id="particles-js" />
							<div className="container">
								<div className="jumbo">
									<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-12 text-center">
										<div className="description">
											<div className="warning">
												<h2>PipePay is a simple escrow service.</h2>
											</div>
											<div className="about">
												<p>
													PipePay helps online merchants increase sales and
													conversion rate and at the same protects the buyers
													interest.
												</p>
											</div>
											<div className="sign-buttons text-center">
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

				<section id="howitworks" className="howItWorks">
					<div className="container">
						<h1 className="home-section-title">How It Works</h1>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12 home-card-box">
								<div className="home-icon icon-send" />
								<div className="howitworks-part">
									<h3 className="other-title">Send Invoice</h3>
									<p className="whyuse-p">
										Send an invoice to your buyers email from your dashboard.
										You can split the payment of the delivery fee and PipePay
										fee with the buyer.
									</p>
								</div>
							</div>

							<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12 home-card-box">
								<div className="home-icon icon-box" />
								<div className="howitworks-part">
									<h3 className="other-title">Deliver Good</h3>
									<p className="whyuse-p">
										Once the customer pays you will receive an email
										notification, then you can now ship and deliver the items.
									</p>
								</div>
							</div>

							<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12 home-card-box">
								<div className="home-icon icon-pay-per-click" />
								<div className="howitworks-part">
									<h3 className="other-title">Request Payment</h3>
									<p className="whyuse-p">
										When the product gets delivered to the buyer, send a payment
										request to the buyer. The buyer can either click decline or
										approve the payment transer
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="clearfix" />
				</section>
				<section id="whyuse" className="whyuse">
					<div className="container">
						<h1 className="home-section-title-inverse">Why Use PipePay</h1>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
								<img src="./assets/lego.svg" height={80} width={80} />
								<h3 className="other-title">Simple</h3>
								<br />
								<p className="whyuse-p">
									It is very easy to create an invoice, all you need is the
									customers email address.
								</p>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
								<img src="./assets/money.svg" height={80} width={80} />
								<h3 className="other-title">Secure</h3>
								<br />
								<p className="whyuse-p">
									Payments are handled by a reliable and secured third party.
								</p>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
								<img src="./assets/law.svg" height={80} width={80} />
								<h3 className="other-title">Fair</h3>
								<br />
								<p className="whyuse-p">
									We have agents that are trained to ensure both buyers and
									sellers are happy.
								</p>
							</div>
						</div>
					</div>
					<hr />
					<div id="pricing" className="container">
						<h1 className="home-section-title-inverse">Pricing</h1>
						<div className="col-lg-12 col-md-12 col-sm-12 col-lg-12">
							<div className="text-center">
								<h1 className="price-amount">5% + ₦100</h1>
								<p>Capped at ₦5000</p>
							</div>
						</div>
					</div>
				</section>
				<section id="faq" className="faq">
					<div className="container">
						<h1 className="home-section-title">Frequently Asked Questions</h1>
						<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12">
						</div>
					</div>
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
							<h4 className="other-title">PipePay</h4>
							<p className="whyuse-p">
								Simple escrow solution designed to help merchants easily
								increase conversion rate and protect buyers interest.
							</p>
							<br />
							<Footer />
						</div>
					</div>
					<br />
					<br />
					<div className="container">
						<p className="text-center" id="copy-p">
							© Pipepay.co {new Date().getFullYear()}
						</p>
					</div>
				</section>
			</>
		);
	}
}

export default Home;
