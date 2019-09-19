import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import nprogess from "nprogress";

import Report from "../../components/report";
import Status from "../../components/status";

type IState = {
	requesting: boolean,
	error: boolean,
	status: string,
	type: string,
	milestoneId: number,
	errorMessage: string,
	invoiceId: string
};

class Confirm extends React.Component<RouteComponentProps> {

	state: IState = {
		requesting: true,
		error: false,
		status: "",
		errorMessage: "",
		type: "",
		milestoneId: -1,
		invoiceId: ""
	};

	componentDidMount() {
		const { match } = this.props;

		// @ts-ignore: not sure why params
		let token = match.params ? match.params.token : null;

		if (window) {
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
							this.setState({
								status: res.data.status,
								invoiceId: res.data._id,
								type: res.data.type
							});
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
	}

	render() {
		return (
			<section className="section">
				<div id="container">
					<div className="container">
						{!this.state.requesting ? (
							!this.state.error ? (
								<React.Fragment>
									{this.state.status === "accepted" &&
										this.state.type === "good" && (
											<div id="text-center">
												<h1 className="text-center">
													Thank you for you response
												</h1>
												<p className="text-center">
													The payment has been transfered successfully
												</p>
												<Status status={true} hideBack={true} back={() => {}} />
											</div>
										)}
									{this.state.status !== "accepted" &&
										this.state.type === "service" && (
											<div id="text-center">
												<h1 className="text-center">
													Thank you for you response
												</h1>
												<p className="text-center">
													The payment for the milestone has been transfered
													successfully
												</p>
												<Status status={true} hideBack={true} back={() => {}} />
											</div>
										)}
									{this.state.status === "accepted" &&
										this.state.type === "service" && (
											<div id="text-center">
												<h1 className="text-center">
													Thank you for you response
												</h1>
												<p className="text-center">
													The payment for the last milestone has been transfered
													successfully
												</p>
												<Status status={true} hideBack={true} back={() => {}} />
											</div>
										)}
									{this.state.status === "rejected" && (
										<React.Fragment>
											<h1 className="text-center">Tell Us More</h1>
											<p className="text-center">
												Give us more info to help resolve your dispute
											</p>
											<Report from="customer"  invoiceId={this.state.invoiceId} />
										</React.Fragment>
									)}
								</React.Fragment>
							) : (
								<React.Fragment>
									<h1 className="text-center">An Error Occured</h1>
									<p className="text-center">{this.state.errorMessage}</p>
									<Status status={false} hideBack={true} back={() => {}} />
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
