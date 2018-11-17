//@flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { RouterHistory, Location } from "react-router-dom";
import NProgress from "nprogress";

import {
	confirmRegistration,
	signin,
	userPool,
	getSession
} from "../../utils/auth";

type State = {
	error: null | string
};

type Props = {
	location: Location,
	setCurrentUser: (user: any) => void,
	history: RouterHistory
};

class VerifyAccount extends React.PureComponent<Props, State> {
	constructor() {
		super();
		this.state = {
			error: null
		};
	}

	submit = async e => {
		e.preventDefault();
		const { location, history, setCurrentUser } = this.props;
		const { username, password } = location.state;

		if (this.formEl.checkValidity() === true) {
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
								ref={e => (this.formEl = e)}
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
								<input
									type="submit"
									name="sign up"
									value="SUBMIT"
									className="text-submit"
								/>
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
