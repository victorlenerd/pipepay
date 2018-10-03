import React, { Component } from "react";

class SendPaymentLink extends Component {
	render() {
		return (
			<div id="container">
				<div className="container">
					<div id="instruction">
						<p>Click The Round Button To Send A Payment Link</p>
					</div>
					<div id="add">
						<img src="https://www.clker.com/cliparts/S/W/G/Q/I/k/white-cross-md.png" alt="add" />
					</div>
				</div>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return <SendPaymentLink />;
	}
}

export default App;
