//@flow

import React from "react";
import { signin, userPool } from "utils/auth";
import { withRouter, Link } from "react-router-dom";
import NProgress from "nprogress";

type Props = {
	history: any,
	setCurrentUser?: any,
}

type State = {
	error: string,
}

class SignIn extends React.PureComponent<Props, State> {
	state = {
		error: ""
	}

	submit = async (e) => {
		const { setCurrentUser, history } = this.props;
		e.preventDefault();
		if (this.formEl.checkValidity() === true) {
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
						const {
							idToken: { payload },
						} = result;
						setCurrentUser(payload);

						if (payload["custom:account_number"] && payload["custom:bank_code"]) {
							history.push("/invoices");
						} else {
							history.push("/verifyaccn");
						}

						return;
					}

					this.setState({ error: err.message });
				});
			} catch (err) {
				NProgress.done();
				if (err.code === "UserNotConfirmedException") {
					return history.push("/verifyemail", { username, password });
				}
				this.setState({ error: err.message });
			}
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
	}

	render() {
		return (
			<div id="container">
				<div className="container">
					<div className="header">
						<h1>Sign In.</h1>
					</div>

					<div className="form">
						<form ref={e => (this.formEl = e)} name="reg-form" onSubmit={this.submit}>
							{this.state.error !== null && <div className="form-error">{this.state.error}</div>}
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								placeholder="Email"
								className="text-input"
								required
							/>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								className="text-input"
								required
							/>
							<Link to="forgotpassword" id="forgot">
                Forgot Password?
							</Link>
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

export default withRouter(SignIn);
