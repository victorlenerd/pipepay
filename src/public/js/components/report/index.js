//@flow
import React from "react";

type Props = {
	from: string,
	invoiceId: string
};

class Report extends React.PureComponent<Props> {
	render() {
		const { from, invoiceId } = this.props;

		return (
			<section className="section">
				<div className="container">
					<div className="col-lg-8">
						<form name="report">
							<label>Select Report</label>
							<br />
							{from === "marchant" && (
								<select
									className="transaction-select"
									style={{ height: 40, minWidth: 400 }}
								>
									<option value="marchant_case_1">
										Marchandise has been delivered buyer is not responding
									</option>
									<option value="marchant_case_2">
										Milestone has been completed buyer is not responding
									</option>
								</select>
							)}
							{from === "customer" && (
								<select
									className="transaction-select"
									style={{ height: 40, minWidth: 400 }}
								>
									<option value="customer_case_1">
										What I got was not what was advertised
									</option>
									<option value="customer_case_2">
										I do not want the product anymore
									</option>
								</select>
							)}
							<br />
							<br />
							<br />
							<label>Upload Documents of Photo</label>
							<p>
								Anything Document or Photo: Such as a receipt from the carier or
								proof that the product has been delivered to the buyer.
							</p>
							<br />
							<input type="file" name="file" />
							<br />
							<br />
							<br />
							<label>Tell Us More About The Problem</label>
							<textarea className="text-input area" />
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
