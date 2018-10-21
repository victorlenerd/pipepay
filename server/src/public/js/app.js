// @flow
import ReactDOM from "react-dom";
import React, { Component } from "react";
import Loadable from "react-loadable";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import WithHeader from "./containers/header.container";

import AppContext from "./contexts/app.context";

import Home from "./pages/home";
import SignIn from "./pages/signin";

import { init } from "./utils/auth";

type State = {
	signedIn: boolean,
	user?: null,
	setCurrentUser?: null,
};

type Props = {};

const Loading = () => <div>Loading...</div>;

// const CreateAnAccount = Loadable({
// 	loader: () => import("./pages/signup"),
// 	loading: Loading,
// });

// const SignIn = Loadable({
// 	loader: () => import("./pages/signin"),
// 	loading: Loading,
// });

// const ForgotPassword = Loadable({
// 	loader: () => import("./pages/forgot-password"),
// 	loading: Loading,
// });

// const VerifyAccount = Loadable({
// 	loader: () => import("./pages/verify-account"),
// 	loading: Loading,
// });

// const ResetPassword = Loadable({
// 	loader: () => import("./pages/reset-password"),
// 	loading: Loading,
// });

// const VerifyAccn = Loadable({
// 	loader: () => import("./pages/verify-accn"),
// 	loading: Loading,
// });

// const Invoice = Loadable({
// 	loader: () => import("./pages/invoice"),
// 	loading: Loading,
// });

// const Invoices = Loadable({
// 	loader: () => import("./pages/invoices"),
// 	loading: Loading,
// });

// const Report = Loadable({
// 	loader: () => import("./pages/report"),
// 	loading: Loading,
// });

// const NewInvoice = Loadable({
// 	loader: () => import("./pages/newinvoice"),
// 	loading: Loading,
// });

// const Settings = Loadable({
// 	loader: () => import("./pages/settings"),
// 	loading: Loading,
// });

// const DissatisfactionReason = Loadable({
// 	loader: () => import("./pages/dissatisfaction-reason"),
// 	loading: Loading,
// });

// const ConfirmSatisfaction = Loadable({
// 	loader: () => import("./pages/confirm-satisfaction"),
// 	loading: Loading,
// });



class App extends Component {
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
            <AppContext.Provider value={this.state}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route path="/signin" render={() => <SignIn />} />
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
		);
	}
}

export default App;
