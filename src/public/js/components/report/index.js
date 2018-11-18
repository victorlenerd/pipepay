//@flow
import React from "react";
import nprogress from "nprogress";
import Status from "../status";

type Props = {
	from: string,
	invoiceId: string
};

type State = {
	submitted: null | boolean,
	success: null | boolean
};

class Report extends React.PureComponent<Props, State> {
	state = {
		submitted: null,
		success: null
	};

	submit = e => {
		e.preventDefault();

		nprogress.start();

		if (e.target.checkValidity()) {
			fetch(`/api/dispute/${this.props.invoiceId}`, {
				method: "POST",
				body: JSON.stringify({
					from: this.props.from,
					reason: e.target.description.value
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.then(res => {
					if (res.success) {
						this.setState({ success: true, submitted: true });
					} else {
						this.setState({ success: false, submitted: true });
					}
				})
				.catch(err => {
					this.setState({ success: false, submitted: true });
				})
				.finally(() => {
					nprogress.done();
				});
		}
	};

	render() {
		const { from, invoiceId } = this.props;
		const { submitted, success } = this.state;

		return (
			<section className="section">
				<div className="container">
					<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
						{submitted === null ? (
							<form name="report" onSubmit={this.submit}>
								<label>Select Dispute Case</label>
								<br />
								{from === "marchant" && (
									<select
										name="reason"
										className="transaction-select"
										style={{ height: 40, minWidth: 400 }}
										required
									>
										<option value="marchant_case_1">
											Marchandise has been delivered buyer is not responding
										</option>
										<option value="marchant_case_2">
											Milestone has been completed buyer is not responding
										</option>
										<option value="marchant_case_3">Other</option>
									</select>
								)}
								{from === "customer" && (
									<select
										name="reason"
										className="transaction-select"
										style={{ height: 40, minWidth: 400 }}
										required
									>
										<option value="customer_case_1">
											What I got was not what was advertised
										</option>
										<option value="customer_case_2">
											I do not want the product anymore
										</option>
										<option value="customer_case_3">Other</option>
									</select>
								)}
								<br />
								<br />
								<label>Tell Us More About The Problem</label>
								<textarea
									required
									className="text-input area"
									name="description"
								/>
								<br />
								<br />
								<input
									type="submit"
									value="DONE"
									id="send"
									className="text-submit"
								/>
							</form>
						) : (
							<React.Fragment>
								<div id="text-center">
									<h1 className="text-center">Thank you for you response</h1>
									<p className="text-center">
										Your message has been received you will hear from our agent
										shortly.
									</p>
									<Status back={() => {}} hideBack={true} status={success} />
								</div>
							</React.Fragment>
						)}
					</div>
				</div>
			</section>
		);
	}
}

export default Report;
