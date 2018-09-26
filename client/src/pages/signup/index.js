import React, { PureComponent } from 'react';
import { signup } from 'utils/auth';
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';

class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			error: null
		}

		this.submit = this.submit.bind(this);
	}

	async submit(e) {
		e.preventDefault();
		if (this.formEl.checkValidity() === true) {
			const firstname =  e.target.firstname.value;
			const lastname =  e.target.lastname.value;
			const email =  e.target.email.value;
			const password =  e.target.password.value;
			const username = email.split('@')[0];

			let dataName = {
				Name : 'name',
				Value : `${firstname} ${lastname}`
			};

			let dataEmail = {
					Name : 'email',
					Value : email
			};

			let attributes = [dataName, dataEmail];
			NProgress.start();
			try {
				await signup(username, password, attributes);
				this.props.history.push('/verifyemail', { username,  password });
			} catch({ message }) {
				this.setState({
					error: message
				});
			}
			NProgress.done();
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
	}

	render() {
		return (
			<div id="container">
				<div className="container">
					<div className="header">
						<h1>Create An Account.</h1>
					</div>
					<div className="form">
						<form ref={e => this.formEl = e} name="reg-form" onSubmit={this.submit}>
							{(this.state.error !== null) && (<div className="form-error">{this.state.error}</div>)}
							<label htmlFor="firstname">First Name</label>
							<input type="text" name="firstname" placeholder="First Name" className="text-input" required />
							<label htmlFor="lastname">Last Name</label>
							<input type="text" name="lastname" placeholder="Last Name" className="text-input" required />
							<label htmlFor="email">Email</label>
							<input type="email" name="email" placeholder="Email" className="text-input" required />
							<label htmlFor="password">Password</label>
							<input type="password" name="password" placeholder="Password" className="text-input" required  />
							<input type="submit" name="sign up" value="SIGN UP" className="text-submit" />
						</form>
					</div>
					<div className="word">
						<Link to="signin"><p>I Have An Existing Account</p></Link>
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
