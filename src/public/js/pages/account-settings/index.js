import React, { Component } from "react";

class ChangePassword extends Component {
	render() {
		return (
			<div id="container">
				<div className="container">
					<div className="header">
						<h2>Change Password</h2>
					</div>
					<div className="form">
						<form>
							<input
								type="text"
								name="password"
								placeholder="Password"
								className="text-input"
							/>
							<input
								type="text"
								name="confirm password"
								placeholder="Confirm Password"
								className="text-input"
							/>
							<input
								type="submit"
								name="done"
								value="DONE"
								className="text-submit"
							/>
						</form>
					</div>
				</div>

				<div className="container">
					<div className="header">
						<h2>Account Details</h2>
					</div>
					<div className="form">
						<form>
							<input
								type="text"
								name="bank name"
								placeholder="Bank Name"
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
		return <ChangePassword />;
	}
}

export default App;
