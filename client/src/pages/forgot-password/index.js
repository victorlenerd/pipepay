import React from "react";
import PropTypes from "prop-types";
import { forgotPassword } from "utils/auth";
import NProgress from "nprogress";

class ForgotPassword extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			error: null,
		};

		this.submit = this.submit.bind(this);
	}

	async submit(e) {
		e.preventDefault();
		if (this.formEl.checkValidity() === true) {
			const username = e.target.email.value.split("@")[0];

			try {
				NProgress.start();
				await forgotPassword(username);
				NProgress.done();
				this.props.history.push("/resetpassword", { username });
			} catch (err) {
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
						<h1>Forgot Password.</h1>
					</div>
					<div className="form">
						<form ref={e => (this.formEl = e)} name="reg-form" onSubmit={this.submit}>
							<input type="email" name="email" placeholder="Email" className="text-input" />
							<input type="submit" name="sign-in" value="SUBMIT" className="text-submit" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

ForgotPassword.propTypes = {
	history: PropTypes.object,
};

export default ForgotPassword;
