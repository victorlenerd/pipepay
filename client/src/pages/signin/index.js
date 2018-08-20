import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			error: null
		};
	}

	submit = (e) => {
		e.preventDefault();
		const email = e.target.email;
		const password = e.target.password;
	}

  render(){
    return (
				<div id="container">
					<div className="container">
						<div className="header">
							<h1>Sign In.</h1>
						</div>

						<div className="form">
							<form onSubmit={this.submit}>
								<input type="email" name="email" placeholder="Phone Number" className="text-input" />
								<input type="password" name="password" placeholder="Password" className="text-input" />
								<Link to="forgotpassword" id="forgot">Forgot Password?</Link>
								<input type="submit" name="sign-in" value="SIGN IN" className="text-submit" />
							</form>
							<div id="have-account">
								<Link to="signup">Already Created An Account</Link>
							</div>
						</div>
					</div>
				</div>
      );
  }
}

export default App;
