import React, { Component } from "react";

class CreatePaymentLink extends Component {
	render() {
		return (
			<div id="container">
				<div className="container">
					<div className="header">
						<h2>
              Create Payment
							<br />
              Link.
						</h2>
					</div>
					<div className="form">
						<form>
							<input
								type="text"
								name="customer-email"
								placeholder="Customer Email"
								id="c-email"
								className="text-input"
							/>
							<textarea placeholder="Description" />
							<input type="text" name="" placeholder="Purchase Price" className="text-input" />
							<input type="text" name="" placeholder="Delivery Price" className="text-input" />
							<input type="submit" name="" value="SEND" id="send" className="text-submit" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return <CreatePaymentLink />;
	}
}

export default App;
