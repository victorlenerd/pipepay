import React from "react";
import PropTypes from "prop-types";
import { signup } from "utils/auth";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import Header from "components/header";

class SignUp extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			error: null
		};

		this.submit = this.submit.bind(this);
	}

	async submit(e) {
		e.preventDefault();
		if (this.formEl.checkValidity() === true) {
			const firstname = e.target.firstname.value;
			const lastname = e.target.lastname.value;
			const email = e.target.email.value;
			const password = e.target.password.value;
			const username = email.split("@")[0];

			let dataName = {
				Name: "name",
				Value: `${firstname} ${lastname}`
			};

			let dataEmail = {
				Name: "email",
				Value: email
			};

			let attributes = [dataName, dataEmail];
			NProgress.start();
			try {
				await signup(username, password, attributes);
				this.props.history.push("/verifyemail", { username, password });
			} catch ({ message }) {
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
			<React.Fragment>
				<Header />
				<div id="container">
					<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-from-content">
						<div className="container-main">
							<div className="header">
								<h1>Create An Account.</h1>
							</div>
							<br /><br />
							<div className="form">
								<form
									ref={e => (this.formEl = e)}
									name="reg-form"
									onSubmit={this.submit}
								>
									{this.state.error !== null && (
										<div className="form-error">{this.state.error}</div>
									)}
									<label htmlFor="firstname">First Name</label>
									<input
										type="text"
										name="firstname"
										placeholder=""
										className="text-input"
										required
									/>
									<br /><br />
									<label htmlFor="lastname">Last Name</label>
									<input
										type="text"
										name="lastname"
										placeholder=""
										className="text-input"
										required
									/>
									<br /><br />
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										placeholder=""
										className="text-input"
										required
									/>
									<br /><br />
									<label htmlFor="password">Password</label>
									<input
										type="password"
										name="password"
										placeholder=""
										className="text-input"
										required
									/>
									<br /><br />
									<input
										type="submit"
										name="sign up"
										value="SIGN UP"
										className="text-submit"
									/>
									<br /><br />
								</form>
							</div>
							<div className="word text-center">
								<Link to="signin">
									<p>I Have An Existing Account</p>
								</Link>
							</div>
							<div className="word text-center">
								<p>By signing up, you agree to our terms and conditions.</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 col-xs-1 cafe-bg" id="noPad">
						<div className="overlay"></div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

SignUp.propTypes = {
	history: PropTypes.object
};

export default SignUp;
