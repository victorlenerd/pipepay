import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import NProgress from "nprogress";

import {
	confirmRegistration,
	resendVerificationCode,
	signin,
	userPool
} from "../../utils/auth";

interface IState {
	error: null | string
};

interface IProps {
	location: Location,
	setCurrentUser: (user: any) => void
};

class VerifyAccount extends React.PureComponent<IProps & RouteComponentProps> {

	state: IState = {
		error: null
	};

	formEl = React.createRef<HTMLFormElement>();

	submit = async e => {
		e.preventDefault();
		const { location, history, setCurrentUser } = this.props;
		const { username, password } = location.state;

		if (this.formEl.current.checkValidity() === true) {
			const verifycode = e.target.verifycode.value;
			NProgress.start();
			try {
				await confirmRegistration(username, verifycode);
				await signin(username, password);

				const cognitoUser = userPool.getCurrentUser();

				cognitoUser.getSession((err, result) => {
					if (result && result.isValid()) {
						const { idToken } = result;

						const { payload, jwtToken } = idToken;
						payload.token = jwtToken;
						setCurrentUser(payload);

						NProgress.done();
						history.push("/verifyaccn");
						return;
					} else {
						this.setState({
							error: err.message
						});
					}
				});
			} catch (err) {
				this.setState({
					error: err.message
				});
				NProgress.done();
			}
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
	};

	resend = async e => {
		e.preventDefault();
		const { location, history } = this.props;
		const { username, password } = location.state;

		NProgress.start();

		try {
			await resendVerificationCode(username, password);
			NProgress.done();
		} catch (err) {
			this.setState({ error: err });
			NProgress.done();
		}
	};

	render() {
		return (
			<div id="container">
				<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					<div className="container-main">
						<div className="header">
							<h1>Verify Your Email.</h1>
							<p>Please enter the verification code sent to your mail.</p>
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
								<label htmlFor="firstname">Verification Code</label>
								<input
									type="text"
									name="verifycode"
									placeholder="Enter your code"
									className="text-input"
									required
								/>
								<br />
								<br />
								<div className="flow-button">
									<input
										type="submit"
										name="sign up"
										value="SUBMIT"
										className="text-submit"
									/>
									<input
										type="button"
										name="resend"
										value="Resend Code"
										className="text-submit-inverse"
										onClick={this.resend}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div
					className="col-lg-6 col-md-6 col-sm-12 col-xs-12 cafe-bg hidden-sm hidden-xs"
					id="noPad"
				>
					<div className="overlay" />
				</div>
			</div>
		);
	}
}

export default withRouter(VerifyAccount);
