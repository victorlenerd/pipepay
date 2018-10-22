import React from "react";

class ConfirmSatisfaction extends React.Component {
	render() {
		return (
			<div id="container">
				<div className="container">
					<div id="words">
						<p>Please Confirm Your Satisfaction For Your Purchase From</p>
						<p id="merchant-name"> Really Nice Shirt.</p>
					</div>
					<div id="button">
						<button>I Like The Product.</button>
						<button>I Dont Like The Product.</button>
					</div>
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return <ConfirmSatisfaction />;
	}
}

export default App;
