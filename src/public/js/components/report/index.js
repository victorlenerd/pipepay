//@flow
import React from "react";
import nprogress from "nprogress";

type Props = {
	from: string,
	invoiceId: string
};

class Report extends React.PureComponent<Props> {
	submit = e => {
		e.preventDefault();

		nprogress.start();

		if (e.target.checkValidity()) {
			console.log("form: valid");
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
						console.log("submitted dispute", res);
					} else {
						console.log("error", res);
					}
				})
				.catch(err => {
					console.log("error", err);
				})
				.finally(() => {
					nprogress.done();
				});
		}
	};

	render() {
		const { from, invoiceId } = this.props;

		return (
			<section className="section">
				<div className="container">
					<div className="col-lg-8">
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
					</div>
				</div>
			</section>
		);
	}
}

export default Report;
