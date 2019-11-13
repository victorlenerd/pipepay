import React from "react";
import { withRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { RouteComponentProps } from "react-router-dom";
import { signOut } from "../../utils/auth";

interface IProps {
	user: {
		name: string,
		"cognito:username": string
	},
	setCurrentUser: (user: any) => void,
	signedIn: boolean
};

type State = {
	pathname: String
};

class Header extends React.PureComponent<IProps & RouteComponentProps, State> {
	state = {
		pathname: ""
	};

	componentDidMount() {
		const { location } = this.props;
		if (location) {
			this.setState({ pathname: location.pathname });
		}
	}

	componentDidUpdate({ location }) {
		this.setState({ pathname: location.pathname });
	}

	signOut = () => {
		const { user, setCurrentUser } = this.props;

		signOut(user["cognito:username"]);
		setCurrentUser(null);
		this.props.history.push("/");
	};

	canShowOtherMenus = () => {
		const { pathname } = this.state;
		return (
			pathname === "/" ||
			pathname === "/login" ||
			pathname === "/register" ||
			pathname === "/faq" ||
			pathname === "/terms" ||
			pathname === "/howitworks" ||
			pathname === "/privacy" ||
			pathname === "/pricing" ||
			pathname === "/forgot-password" ||
			pathname === "/reset-password"
		);
	};

	render() {
		const { pathname } = this.state;
		const { history, signedIn, user } = this.props;

		return (
			<nav className="navbar navbar-default navbar-fixed-top" id="navbar-default">
				<div className="container">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">
							PipePay
						</Link>
						<button className="navbar-toggle" value="MENU"/>
					</div>
					<div className="navbar-collapse collapse">
						{!signedIn && (
							<ul className="nav navbar-nav navbar-right">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/#howitworks">How It Works</Link>
								</li>
								<li>
									<Link to="/#faq">F.A.Q</Link>
								</li>
								<li>
									<Link to="/register">Register</Link>
								</li>
								<li>
									<Link to="/login">Login</Link>
								</li>
						</ul>
						)}
						{signedIn && (
							<ul className="nav navbar-nav navbar-right">
								<li>
									<Link to="/invoices">Invoices</Link>
								</li>
								<li>
									<Link to="/new-invoice">Send Invoice</Link>
								</li>
								<li>
									<Link to="/settings">Settings</Link>
								</li>
								<li
									key='/signout'
									onClick={() => this.signOut()}>
										<a>
											Sign Out ({user.name})
										</a>
								</li>
						</ul>)}
					</div>
				</div>
			</nav>
		);
	}
}

export default withRouter(Header) as React.ComponentType<any>;
