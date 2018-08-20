import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

class App extends Component {
	constructor() {
		super();
		this.state = {
			error: null
		}
	}

	submit = (e) => {
		e.preventDefault();
		const name =  e.target.name;
		const email =  e.target.email;
		const password =  e.target.password;
	}

  render() {
    return (
				<div id="container">
					<div className="container">
						<div className="header">
							<h1>Create An Account.</h1>
						</div>
						<div className="form">
							<form name="reg-form" onSubmit={this.submit}>
								<input type="text" name="name" placeholder="Name" className="text-input" />
								<input type="email" name="email" placeholder="Email" className="text-input" />
								<input type="password" name="password" placeholder="Password" className="text-input" />
								<input type="submit" name="sign up" value="SIGN UP" className="text-submit" />
							</form>
						</div>
						<div className="word">
							<Link to="signin"><p>Don't Have An Existing Account</p></Link>
						</div>
						<div className="word">
							<p>By signing up, you agree to our terms and conditions.</p>
						</div>
					</div>
				</div>
    );
  }
}

export default App;
