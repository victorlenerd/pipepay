import { hot } from "react-hot-loader";
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import WithHeader from "./containers/header.container";

import AppContext from "./contexts/app.context";

import Home from "./pages/home";
import SignIn from "./pages/login";
import CreateAccount from "./pages/register";
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
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

import { init, signin, userPool, getSession, signOut } from "./utils/auth";
import NProgress from "nprogress";
import ReAuthModal from "./components/modal/reauth";

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

	loginAgain = async (e) => {
		e.preventDefault();

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
					<ReAuthModal
						error={error}
						loginAgain={this.loginAgain}
						confirmPasswordEl={this.confirmPasswordEl}
					/>
					<Switch>
						<Route exact path="/" render={() => WithHeader(Home)} />
						<Route path="/login" render={() => !signedIn ? WithHeader(SignIn) : <Redirect to="/invoices" /> } />
						<Route path="/register" render={() => !signedIn ? (WithHeader(CreateAccount)) : (<Redirect to="/invoices" />)} />
						<Route path="/forgot-password" render={() => !signedIn ? (WithHeader(ForgotPassword)) : (<Redirect to="/invoices" />)} />
						<Route path="/verify-email" render={() => WithHeader(VerifyAccount)} />
						<Route path="/reset-password" render={() => !signedIn ? (WithHeader(ResetPassword)) : (<Redirect to="/invoices" />)} />
						<Route path="/verify-account" render={() => WithHeader(VerifyBankAccount)} />
						<Route path="/invoice/:invoiceId" render={() => signedIn ? WithHeader(Invoice) : <Redirect to="/" />}/>
						<Route path="/invoices" render={() => signedIn ? WithHeader(Invoices) : <Redirect to="/" />}/>
						<Route path="/report/:invoiceId" render={() => signedIn ? WithHeader(Report) : <Redirect to="/" />} />
						<Route path="/new-invoice" render={() => signedIn ? WithHeader(NewInvoice) : <Redirect to="/" />}/>
						<Route path="/settings" render={() => SignIn ? WithHeader(Settings) : <Redirect to="/" />}/>
						<Route path="/confirm/:token" render={() => WithHeader(Confirm)} />
						<Route path="/terms" render={() => WithHeader(Terms)} />
						<Route path="/privacy" render={() => WithHeader(Privacy)} />
					</Switch>
				</AppContext.Provider>
		);
	}
}

export default hot(module)(App);
