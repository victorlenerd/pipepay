import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import NProgress from "nprogress";

type Props = RouteComponentProps


class PaymentRequest extends React.Component<Props> {

	public async handleMakePaymentClick() {
		if (typeof window !== "undefined") {
			NProgress.start();
			// @ts-ignore:
			const { invoice } = window.__initial_data__;
			await fetch(`/pay-now/${invoice._id}`, {
				method: "GET"
			}).then((res) => res.json())
				.then(({ success, authorization_url = null }) => {
					if (success) {
						window.open(authorization_url);
					}
				}).finally(() => {
					NProgress.done();
				})
		}
	}

	public render() {
		if (typeof window !== "undefined") {

			//  @ts-ignore:
			const { invoice, seller } = window.__initial_data__;

			return (
				<section className="section">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="container">

							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 invoice-left">

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoice-bottom">
									<div className="pull-left">
										<label>Description</label>
										<h4>{invoice.description}</h4>
									</div>
									<div className="pull-right">
										<label>Total Amount</label>
										<div className="invoice-price-main">
											&#x20A6; {invoice.totalPrice}
										</div>
									</div>
								</div>
								<div className="clearfix"/>
								<br/>
								<br/>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoice-bottom">
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Seller Name</label>
										<h4>{invoice.merchantName}</h4>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Seller Email</label>
										<h4>{invoice.merchantEmail}</h4>
									</div>
								</div>
								<div className="clearfix"/>
								<br/>
								<br/>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Seller Social Links</label>
										<ul style={{ listStyle: "none" }}>
											{seller.facebook_username && <li>
												<a style={{ color: "#000", textDecoration: "underline" }} target="_blank"
													 href={`https://facebook.com/${seller.facebook_username}`}>Facebook</a>
											</li>}
											{seller.twitter_username && <li>
												<a style={{ color: "#000", textDecoration: "underline" }} target="_blank"
													 href={`https://twitter.com/${seller.twitter_username}`}>Twitter</a>
											</li>}
											{seller.instagram_username && <li>
												<a style={{ color: "#000", textDecoration: "underline" }} target="_blank"
													 href={`https://instagram.com/${seller.instagram_username}`}>Instagram</a>
											</li>}
											{seller.website_url && <li>
												<a style={{ color: "#000", textDecoration: "underline" }} target="_blank"
													 href={`${seller.website_url}`}>Website</a>
											</li>}
										</ul>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<label>Seller Address</label>
										<h4>{seller.address}</h4>
									</div>
								</div>
								<div className="clearfix"/>
							</div>

							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<h3 className="text-center">
									Hey {invoice.customerName}<br />
									What are you waiting for?
								</h3>
								<br />
								<br />
								{(invoice.status === 'sent') && <div>
									<input
										type="submit"
										value="Make Payment"
										className="text-submit"
										onClick={this.handleMakePaymentClick}
									/>
								</div>}
								<br />
								<h3 className="text-center">
									Your money is safe with us.
								</h3>
								<br />
							</div>

						</div>

					</div>
				</section>
			);
		}

		return null;
	}
}

export default withRouter(PaymentRequest);
