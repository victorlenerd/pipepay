//@flow
import React from "react";
import NProgress from "nprogress";
import { withRouter } from "react-router-dom";

import { forgotPassword } from "../../utils/auth";
import BannerFrom from "../../containers/banner-form.container";

type Props = {
	history: object
};

class ForgotPassword extends React.PureComponent<Props> {
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
			<BannerFrom title="Forgot Password">
				<div className="form">
					<form
						ref={e => (this.formEl = e)}
						name="reg-form"
						onSubmit={this.submit}
					>
						{this.state.error !== null && (
							<div className="form-error">{this.state.error}</div>
						)}
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="text-input"
						/>
						<br />
						<br />
						<input
							type="submit"
							name="sign-in"
							value="SUBMIT"
							className="text-submit"
						/>
					</form>
				</div>
			</BannerFrom>
		);
	}
}

export default withRouter(ForgotPassword);
