import React from "react";
import NProgress from "nprogress";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { confirmPassword } from "../../utils/auth";
import BannerFrom from "../../containers/banner-form.container";

type State = {
	error ?: string
};

class ResetPassword extends React.PureComponent<RouteComponentProps, State> {

	state: State = {
		error: null
	};

	formEl = React.createRef<HTMLFormElement>();

	submit = async (e) => {
		e.preventDefault();
		const { username } = this.props.location.state;

		if (this.formEl.current.checkValidity() === true) {
			const password = e.target.password.value;
			const code = e.target.code.value;
			NProgress.start();
			try {
				await confirmPassword(username, code, password);
				this.props.history.push("/signin");
			} catch ({ message }) {
				this.setState({ error: message });
			}
			NProgress.done();
		} else {
			this.setState({
				error: "Please fill all the required fields."
			});
		}
	};

	render() {
		return (
			<BannerFrom title="Reset Password">
				<div className="form">
					<form
						ref={this.formEl}
						name="reg-form"
						onSubmit={this.submit}
					>
						{this.state.error !== null && (
							<div className="form-error">{this.state.error}</div>
						)}
						<label htmlFor="code">Code</label>
						<input
							type="text"
							name="code"
							placeholder="Code"
							className="text-input"
							required
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Confirm Password"
							className="text-input"
							required
						/>
						<br />
						<br />
						<input
							type="submit"
							name="done"
							value="DONE"
							className="text-submit"
						/>
					</form>
				</div>
			</BannerFrom>
		);
	}
}

export default withRouter(ResetPassword);
