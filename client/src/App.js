// @flow

import React, { Component } from "react";
import Loadable from "react-loadable";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import WithHeader from "containers/header.container";

import AppContext from "contexts/app.context";

import Home from "pages/home";
import { init } from "utils/auth";

import "styles/nprogress.css";
import "styles/bootstrap.min.css";

type State = {
	signedIn: boolean,
	user?: null,
	setCurrentUser?: null,
};

type Props = {};

const Loading = () => <div>Loading...</div>;

const CreateAnAccount = Loadable({
	loader: () => import("pages/signup"),
	loading: Loading,
});

const SignIn = Loadable({
	loader: () => import("pages/signin"),
	loading: Loading,
});

const ForgotPassword = Loadable({
	loader: () => import("pages/forgot-password"),
	loading: Loading,
});

const VerifyAccount = Loadable({
	loader: () => import("pages/verify-account"),
	loading: Loading,
});

const ResetPassword = Loadable({
	loader: () => import("pages/reset-password"),
	loading: Loading,
});

const VerifyAccn = Loadable({
	loader: () => import("pages/verify-accn"),
	loading: Loading,
});

const Invoice = Loadable({
	loader: () => import("pages/invoice"),
	loading: Loading,
});

const Invoices = Loadable({
	loader: () => import("pages/invoices"),
	loading: Loading,
});

const Report = Loadable({
	loader: () => import("pages/report"),
	loading: Loading,
});

const NewInvoice = Loadable({
	loader: () => import("pages/newinvoice"),
	loading: Loading,
});

const Settings = Loadable({
	loader: () => import("pages/settings"),
	loading: Loading,
});

const DissatisfactionReason = Loadable({
	loader: () => import("pages/dissatisfaction-reason"),
	loading: Loading,
});

const ConfirmSatisfaction = Loadable({
	loader: () => import("pages/confirm-satisfaction"),
	loading: Loading,
});

class App extends Component<Props, State> {
	state = {
		signedIn: false,
		user: null,
		setCurrentUser: user => this.setState({ user, signedIn: user !== null }),
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
						<Route exact path="/" render={() => <Home />} />
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
									WithHeader(CreateAnAccount)
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
								signedIn ? <VerifyAccn /> : <Redirect to="/invoices" />
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

						<Route
							path="/reason"
							component={WithHeader(DissatisfactionReason)}
						/>
						<Route
							path="/confirm/:invoiceId"
							component={WithHeader(ConfirmSatisfaction)}
						/>
					</Switch>
				</AppContext.Provider>
			</BrowserRouter>
		);
	}
}

export default App;
