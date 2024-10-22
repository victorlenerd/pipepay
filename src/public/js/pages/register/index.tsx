import React from "react";
import { withRouter, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import NProgress from "nprogress";

import { signup } from "../../utils/auth";

type IState = {
	error: null | string
};

class SignUp extends React.PureComponent<RouteComponentProps> {

	formEl = React.createRef<HTMLFormElement>();

	state: IState = {
		error: null
	};

	submit = async e => {
		e.preventDefault();
		if (this.formEl.current.checkValidity() === true) {
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
				this.props.history.push("/verify-email", { username, password });
			} catch (err) {
				this.setState({
					error: err.message
				});
			}
			NProgress.done();
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
	};

	render() {
		return (
			<React.Fragment>
				<div id="container">
					<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12">
						<div className="container-main">
							<div className="header">
								<h1>Create An Account.</h1>
							</div>
							<br />
							<br />
							<div className="form">
								<form
									ref={this.formEl}
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
									<br />
									<br />
									<label htmlFor="lastname">Last Name</label>
									<input
										type="text"
										name="lastname"
										placeholder=""
										className="text-input"
										required
									/>
									<br />
									<br />
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										placeholder="your email"
										autoComplete="email"
										className="text-input"
										required
									/>
									<br />
									<br />
									<label htmlFor="password">Password</label>
									<input
										type="password"
										name="password"
										autoComplete="new-password"
										placeholder=""
										className="text-input"
										required
									/>
									<br />
									<br />
									<input
										type="submit"
										name="sign up"
										value="Register"
										className="text-submit"
									/>
									<br />
									<br />
								</form>
							</div>
							<div className="word text-center">
								<Link to="login">
									<p>I Have An Existing Account</p>
								</Link>
							</div>
							<div className="word text-center">
								<p>By signing up, you agree to our terms and conditions.</p>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(SignUp);
