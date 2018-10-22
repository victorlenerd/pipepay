import React from "react";

class Report extends React.PureComponent {
	render() {
		return (
			<section className="section">
				<div className="container">
					<div className="col-lg-8">
						<form name="report">
							<label>Select Report</label>
							<br />
							<select className="transaction-select" style={{ height: 40, minWidth: 400 }}>
								<option value="week">Marchandise has been delivered buyer is not responding</option>
								<option value="week">Milestone has been completed buyer is not responding</option>
							</select>
							<br />
							<br />
							<br />
							<label>Upload Documents of Photo</label>
							<p>
                Anything Document or Photo: Such as a receipt from the carier or proof that the
                product has been delivered to the buyer.
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
							<input type="submit" value="DONE" id="send" className="text-submit" />
						</form>
					</div>
				</div>
			</section>
		);
	}
}

export default Report;
