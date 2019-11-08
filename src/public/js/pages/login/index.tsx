import React from "react";
import { signin, userPool } from "../../utils/auth";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import NProgress from "nprogress";

type Props = {
	setCurrentUser?: any
};

type State = {
	error: string
};

class SignIn extends React.PureComponent<Props & RouteComponentProps, State> {
	state = {
		error: ""
	};

	formEl = React.createRef<HTMLFormElement>();

	submit = async e => {
		const { setCurrentUser, history } = this.props;
		e.preventDefault();
		if (this.formEl.current.checkValidity() === true) {
			const email = e.target.email.value;
			const password = e.target.password.value;
			const username = email.split("@")[0];

			try {
				NProgress.start();
				await signin(username, password);
				const cognitoUser = userPool.getCurrentUser();
				cognitoUser.getSession((err, result) => {
					if (result && result.isValid()) {
						NProgress.done();
						const { idToken } = result;

						const { payload, jwtToken } = idToken;
						payload.token = jwtToken;
						setCurrentUser(payload);

						if (
							payload["custom:account_number"] &&
							payload["custom:bank_code"]
						) {
							history.push("/invoices");
						} else {
							history.push("/verify-account");
						}

						return;
					}

					this.setState({ error: err.message });
				});
			} catch (err) {
				NProgress.done();
				if (err.code === "UserNotConfirmedException") {
					return history.push("/verify-email", { username, password });
				}
				this.setState({ error: err.message });
			}
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
	};

	render() {
		return (
			<React.Fragment>
				<div
					className="col-lg-6 col-md-6 col-sm-12 cloths-bg hidden-sm hidden-xs"
					id="noPad"
				>
					<div className="overlay" />
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-from-content">
					<div className="container-main">
						<div className="header">
							<h1>Sign In.</h1>
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
								<label htmlFor="email">Email</label>
								<input
									autoComplete="email"
									type="email"
									name="email"
									placeholder=""
									className="text-input"
									required
								/>
								<br />
								<br />
								<label htmlFor="password">Password</label>
								<input
									autoComplete="current-password"
									type="password"
									name="password"
									className="text-input"
									required
								/>
								<br />
								<br />
								<Link to="forgot-password" id="forgot">
									Forgot Password?
								</Link>
								<br />
								<br />
								<input
									type="submit"
									name="sign-in"
									value="SIGN IN"
									className="text-submit"
								/>
								<br />
								<br />
								<div id="have-account">
									<Link className="text-centr" to="register">
										I haven't created an account
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(SignIn);
