import React, { Component } from "react";

class SetPaymentAccount extends Component {
	render() {
		return (
			<div id="container">
				<div className="container">
					<div className="header">
						<h2>Account Details</h2>
					</div>
					<div id="instruction">
						<p>Please set account to be used for payments.</p>
					</div>
					<div className="form">
						<form>
							<input
								type="text"
								name="choose bank"
								placeholder="Choose Bank"
								className="text-input"
							/>
							<input
								type="text"
								name="account number"
								placeholder="Account Number"
								className="text-input"
							/>
							<input
								type="submit"
								name="send"
								value="DONE"
								className="text-submit"
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return <SetPaymentAccount />;
	}
}

export default App;
