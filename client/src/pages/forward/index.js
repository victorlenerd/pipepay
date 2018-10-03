import React, { Component } from "react";

class Forward extends Component {
	render() {
		return (
			<div id="container">
				<div className="container">
					<div id="content">
						<div id="amount">
							<p>NGN 25,500</p>
						</div>
						<div id="name">
							<p>Benjamin Dada</p>
						</div>
						<div id="email">
							<p>benjamindada@gmail.com</p>
						</div>
						<div id="link">
							<a href="#forward">Forward To Another Customer</a>
						</div>
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
		return <Forward />;
	}
}

export default App;
