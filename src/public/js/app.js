// @flow
import ReactDOM from "react-dom";
import RDS from "react-dom/server";
import React, { Component } from "react";
import Loadable from "react-loadable";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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

import { init } from "./utils/auth";

type State = {
	signedIn: boolean,
	user: any,
	setCurrentUser: (user: any) => void
};

type Props = {};

class App extends Component<Props, State> {
	state = {
		signedIn: false,
		user: null,
		setCurrentUser: user => this.setState({ user, signedIn: user !== null })
	};

	componentWillMount() {
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
	}

	render() {
		const { signedIn } = this.state;

		return (
			<BrowserRouter>
				<AppContext.Provider value={this.state}>
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
								!signedIn ? <ForgotPassword /> : <Redirect to="/invoices" />
							}
						/>
						<Route
							path="/verifyemail"
							render={() =>
								!signedIn ? <VerifyAccount /> : <Redirect to="/invoices" />
							}
						/>
						<Route
							path="/resetpassword"
							render={() =>
								!signedIn ? <ResetPassword /> : <Redirect to="/invoices" />
							}
						/>
						<Route
							path="/verifyaccn"
							render={() =>
								signedIn ? <VerifyBankAccount /> : <Redirect to="/invoices" />
							}
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
							path="/report"
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
					</Switch>
				</AppContext.Provider>
			</BrowserRouter>
		);
	}
}

export default App;
