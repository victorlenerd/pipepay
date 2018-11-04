//@flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
import nprogess from "nprogress";

import Report from "../../components/report";

type Props = {
	match: {
		params: {
			token: string
		}
	}
};

type State = {
	requesting: boolean,
	error: boolean,
	status: string,
	errorMessage: string,
	invoiceId: string
};

class Confirm extends React.Component<Props, State> {
	state = {
		requesting: true,
		error: false,
		status: "",
		errorMessage: "",
		invoiceId: ""
	};

	componentWillMount() {
		const { match } = this.props;

		let token = match.params ? match.params.token : null;

		if (token) {
			nprogess.start();
			fetch(`/api/confirm/${token}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/javascript"
				}
			})
				.then(res => res.json())
				.then(res => {
					if (res.success) {
						this.setState({ status: res.status, invoiceId: res.invoiceId });
					} else {
						this.setState({ error: true, errorMessage: res.error });
					}

					this.setState({ requesting: false });
					nprogess.done();
				});
		} else {
			this.setState({ error: true });
		}
	}

	render() {
		return (
			<section className="section">
				<div id="container">
					<div className="container">
						{!this.state.requesting ? (
							!this.state.error ? (
								<React.Fragment>
									{this.state.status === "accepted" && (
										<div id="text-center">
											<h1>Thank you for you response</h1>
											<p>The payment has been transfered successfully</p>
										</div>
									)}
									{this.state.status === "rejected" && (
										<React.Fragment>
											<h1 className="text-center">Tell Us More</h1>
											<p className="text-center">
												Give us more info to help resolve your dispute
											</p>
											<Report
												from="customer"
												invoiceId={this.state.invoiceId}
											/>
										</React.Fragment>
									)}
								</React.Fragment>
							) : (
								<React.Fragment>
									<h1 className="text-center">An Error Occured</h1>
									<p className="text-center">{this.state.errorMessage}</p>
								</React.Fragment>
							)
						) : null}
					</div>
				</div>
			</section>
		);
	}
}
export default withRouter(Confirm);
