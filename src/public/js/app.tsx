import { hot } from "react-hot-loader";
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import WithHeader from "./containers/header.container";

import AppContext from "./contexts/app.context";

import Home from "./pages/home";
import SignIn from "./pages/signin";
import CreateAccount from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import VerifyAccount from "./pages/verify-account";
import ResetPassword from "./pages/reset-password";
import Invoices from "./pages/invoices";
import VerifyBankAccount from "./pages/verify-bank-account";
import Invoice from "./pages/invoice";
import Report from "./pages/report";
import NewInvoice from "./pages/newinvoice";
import Settings from "./pages/settings";
import Confirm from "./pages/confirm";
import Pricing from "./pages/pricing";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

import { init, signin, userPool, getSession, signOut } from "./utils/auth";
import NProgress from "nprogress";

interface IState {
	signedIn: boolean
	user: any
	error: null | string
	confirmPassword: () => void
	confirmPasswordCallback: () => void
	setCurrentUser: (user: any) => void
	updateSession: (callback: () => void) => void
}

class App extends Component {

	confirmPasswordEl = React.createRef<HTMLInputElement>();

	state: IState = {
		signedIn: false,
		user: null,
		error: null,
		confirmPassword: () => {},
		confirmPasswordCallback: () => {},
		updateSession: () => {},
		setCurrentUser: (user: {} | null) => this.setState({ user, signedIn: user !== null })
	};

	componentDidMount() {
		try {
			init()
				.getCurrentUser()
				.getSession(async (err, result) => {
					console.log({ err, result });
					if (result && result.isValid()) {
						const { idToken } = result;
						const { payload, jwtToken } = idToken;
						payload.token = jwtToken;
						this.state.setCurrentUser(payload);
					} else {
						this.state.setCurrentUser(null);
					}
				});
		} catch (err) {
			this.state.setCurrentUser(null);
		}

		this.setState({
			confirmPassword: this.confirmPassword,
			updateSession: this.updateSession
		});
	}

	confirmPassword = (callback: () => void): void => {
		// @ts-ignore: Modal is from bootstrap
		$("#confirm-password-modal").modal({
			backdrop: "static",
			keyboard: false
		});
		this.setState({ confirmPasswordCallback: callback });
	};

	loginAgain = async () => {
		try {
			await signin(
				this.state.user["cognito:username"],
				this.confirmPasswordEl.current.value
			);
			const cognitoUser = userPool.getCurrentUser();
			cognitoUser.getSession((err, result) => {
				if (result && result.isValid()) {
					NProgress.done();
					const { idToken } = result;

					const { payload, jwtToken } = idToken;
					payload.token = jwtToken;
					this.state.setCurrentUser(payload);
					// @ts-ignore: Modal is from bootstrap
					$("#confirm-password-modal").modal("hide");
					return this.state.confirmPasswordCallback();
				}

				this.setState({ error: err.message });
			});
		} catch (err) {
			this.setState({ error: err.message });
		}
	};

	updateSession = (callback: () => void) => {
		getSession(this.state.user["congito:username"])
			.then(result => {
				if (result && result.isValid()) {
					NProgress.done();
					const { idToken } = result;

					const { payload, jwtToken } = idToken;
					payload.token = jwtToken;
					this.state.setCurrentUser(payload);
					callback();
				}
			})
			.catch(() => {
				signOut();
				this.state.setCurrentUser(null);
			});
	};

	render() {
		const { signedIn, error } = this.state;

		return (
				<AppContext.Provider value={this.state}>
					<div
						id="confirm-password-modal"
						className="modal fade bs-example-modal-sm"
						tabIndex={-1}
						role="dialog"
						aria-labelledby="mySmallModalLabel"
					>
						<div className="modal-dialog modal-sm" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 className="modal-title" id="myModalLabel">
										Enter Password
									</h4>
								</div>
								<div className="modal-body">
									{error && <div className="alert aler-danger">{error}</div>}
									<input
										type="password"
										className="form-control"
										ref={this.confirmPasswordEl}
									/>
								</div>
								<div className="modal-footer">
									<input
										type="button"
										className="btn btn-small btn-primary"
										value="Submit"
										onClick={this.loginAgain}
									/>
								</div>
							</div>
						</div>
					</div>
					<Switch>
						<Route exact path="/" render={() => WithHeader(Home)} />
						<Route exact path="/pricing" render={() => WithHeader(Pricing)} />
						<Route
							path="/signin"
							render={() =>
								!signedIn ? WithHeader(SignIn) : <Redirect to="/invoices" />
							}
						/>
						<Route
							path="/signup"
							render={() =>
								!signedIn ? (
									WithHeader(CreateAccount)
								) : (
									<Redirect to="/invoices" />
								)
							}
						/>
						<Route
							path="/forgotpassword"
							render={() =>
								!signedIn ? (
									WithHeader(ForgotPassword)
								) : (
									<Redirect to="/invoices" />
								)
							}
						/>
						<Route
							path="/verifyemail"
							render={() => WithHeader(VerifyAccount)}
						/>
						<Route
							path="/resetpassword"
							render={() =>
								!signedIn ? (
									WithHeader(ResetPassword)
								) : (
									<Redirect to="/invoices" />
								)
							}
						/>
						<Route
							path="/verifyaccn"
							render={() => WithHeader(VerifyBankAccount)}
						/>
						<Route
							path="/invoice/:invoiceId"
							render={() =>
								signedIn ? WithHeader(Invoice) : <Redirect to="/" />
							}
						/>
						<Route
							path="/invoices"
							render={() =>
								signedIn ? WithHeader(Invoices) : <Redirect to="/" />
							}
						/>
						<Route
							path="/report/:invoiceId"
							render={() =>
								signedIn ? WithHeader(Report) : <Redirect to="/" />
							}
						/>
						<Route
							path="/newinvoice"
							render={() =>
								signedIn ? WithHeader(NewInvoice) : <Redirect to="/" />
							}
						/>
						<Route
							path="/settings"
							render={() =>
								SignIn ? WithHeader(Settings) : <Redirect to="/" />
							}
						/>
						<Route path="/confirm/:token" render={() => WithHeader(Confirm)} />
						<Route path="/terms" render={() => WithHeader(Terms)} />
						<Route path="/privacy" render={() => WithHeader(Privacy)} />
					</Switch>
				</AppContext.Provider>
		);
	}
}

export default hot(module)(App);
