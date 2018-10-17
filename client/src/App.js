// @flow

import React, { Component } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AppContext from "contexts/app.context";

import Home from "pages/home";
import SignIn from "pages/signin";
import CreateAnAccount from "pages/signup";
import ForgotPassword from "pages/forgot-password";
import VerifyAccount from "pages/verify-account";
import ResetPassword from "pages/reset-password";
import VerifyAccn from "pages/verify-accn";

import DissatisfactionReason from "pages/dissatisfaction-reason";
import ConfirmSatisfaction from "pages/confirm-satisfaction";

import Invoice from "pages/invoice";
import Invoices from "pages/invoices";
import NewInvoice from "pages/newinvoice";
import Report from "pages/report";
import Settings from "pages/settings";

import WithHeader from "containers/header.container";

import { init } from "utils/auth";

import "styles/nprogress.css";
import "styles/bootstrap.min.css";

type State = {
  signedIn: boolean,
  user?: null,
  setCurrentUser?: null
}

type Props = {}

class App extends Component<Props, State> {
	state = {
		signedIn: false,
		user: null,
		setCurrentUser: user => this.setState({ user, signedIn: user !== null }),
	}

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
						<Route exact path="/" render={() => <Home />} />
						<Route
							path="/signin"
							render={() => (!signedIn ? <SignIn {...this.state} /> : <Redirect to="/invoices" />)}
						/>
						<Route
							path="/signup"
							render={() => (!signedIn ? <CreateAnAccount /> : <Redirect to="/invoices" />)}
						/>
						<Route
							path="/forgotpassword"
							render={() => (!signedIn ? <ForgotPassword /> : <Redirect to="/invoices" />)}
						/>
						<Route
							path="/verifyemail"
							render={() => (!signedIn ? <VerifyAccount /> : <Redirect to="/invoices" />)}
						/>
						<Route
							path="/resetpassword"
							render={() => (!signedIn ? <ResetPassword /> : <Redirect to="/invoices" />)}
						/>
						<Route
							path="/verifyaccn"
							render={() => (signedIn ? <VerifyAccn /> : <Redirect to="/invoices" />)}
						/>

						<Route
							path="/invoice"
							render={() => (signedIn ? WithHeader(Invoice) : <Redirect to="/" />)}
						/>
						<Route
							path="/invoices"
							render={() => (signedIn ? WithHeader(Invoices) : <Redirect to="/" />)}
						/>
						<Route
							path="/report"
							render={() => (signedIn ? WithHeader(Report) : <Redirect to="/" />)}
						/>
						<Route
							path="/newinvoice"
							render={() => (signedIn ? WithHeader(NewInvoice) : <Redirect to="/" />)}
						/>
						<Route
							path="/settings"
							render={() => (SignIn ? WithHeader(Settings) : <Redirect to="/" />)}
						/>

						<Route path="/reason" component={DissatisfactionReason} />
						<Route path="/confirm/:invoiceId" component={ConfirmSatisfaction} />
					</Switch>
				</AppContext.Provider>
			</BrowserRouter>
		);
	}
}

export default App;
