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
	pathname: String,
	menuOpen: boolean
};

class Header extends React.PureComponent<IProps & RouteComponentProps, State> {
	state = {
		pathname: "",
		menuOpen: false
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

	toggleMenu = () => {
		this.setState((state) => ({
			...state,
			menuOpen: !state.menuOpen,
		}));
	};

	render() {
		const { pathname, menuOpen } = this.state;
		const { history, signedIn, user } = this.props;

		return (
			<nav className="navbar navbar-default navbar-fixed-top" id="navbar-default">
				<div className="container">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">
							PipePay
						</Link>
						<button onClick={this.toggleMenu} className="navbar-toggle collapsed" data-target="#menu-toggle">
							{!menuOpen ?
								<img src="/assets/menu.svg" height="22px" /> :
								<img src="/assets/close.svg" height="22px" />}
						</button>
					</div>
					<div id="menu-toggle" className={!menuOpen ? "navbar-collapse collapse" : "navbar-collapse collapse open-menu"}>
						{!signedIn && (
							<ul className="nav navbar-nav navbar-right">
								<li onClick={this.toggleMenu}>
									<Link to="/">Home</Link>
								</li>
								<li onClick={this.toggleMenu}>
									<Link to="/#howitworks">How It Works</Link>
								</li>
								<li onClick={this.toggleMenu}>
									<Link to="/#faq">F.A.Q</Link>
								</li>
								<li onClick={this.toggleMenu}>
									<Link to="/register">Register</Link>
								</li>
								<li onClick={this.toggleMenu}>
									<Link to="/login">Login</Link>
								</li>
						</ul>
						)}
						{signedIn && (
							<ul className="nav navbar-nav navbar-right">
								<li onClick={this.toggleMenu}>
									<Link to="/invoices">Invoices</Link>
								</li>
								<li onClick={this.toggleMenu}>
									<Link to="/new-invoice">Send Invoice</Link>
								</li>
								<li onClick={this.toggleMenu}>
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
