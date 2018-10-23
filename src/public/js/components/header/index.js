//@flow
import React from "react";
import { Link, withRouter } from "react-router-dom";
import type { Location, History } from "react-router-dom";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { signOut } from "../../utils/auth";

type Props = {
	history: History,
	location: Location,
	user: { name: string, "cognito:username": string },
	setCurrentUser: () => void,
	signedIn: boolean
};

type State = {
	pathname: String
};

class Header extends React.PureComponent<Props, State> {
	state = {
		pathname: ""
	};

	componentWillMount() {
		const { location } = this.props;
		if (location) {
			this.setState({ pathname: location.pathname });
		}
	}

	componentWillReceiveProps({ location }) {
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
			pathname === "/signin" ||
			pathname === "/signup" ||
			pathname === "/faq" ||
			pathname === "/terms" ||
			pathname === "/howitworks" ||
			pathname === "/privacypolicy" ||
			pathname === "/forgotpassword" ||
			pathname === "/resetpassword"
		);
	};

	render() {
		const { pathname } = this.state;
		const { history, signedIn, user } = this.props;

		return (
			<Navbar
				fixedTop
				collapseOnSelect
				id="navbar-default"
				style={
					pathname === "/" ? { backgroundColor: "rgba(0,0,0, 0.2)" } : null
				}
			>
				<div className="container">
					<Navbar.Header>
						<Link to="/" className="navbar-brand">
							PipePay.Africa
						</Link>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						{this.canShowOtherMenus() && (
							<Nav pullLeft>
								<NavItem
									active={pathname === "/pricing"}
									onClick={() => this.props.history.push("/pricing")}
								>
									Pricing
								</NavItem>
								<NavItem
									active={pathname === "/howitworks"}
									onClick={() => this.props.history.push("/howitworks")}
								>
									How It Works
								</NavItem>
								<NavItem
									active={pathname === "/faq"}
									onClick={() => history.push("/faq")}
								>
									F.A.Q
								</NavItem>
								<NavItem
									active={pathname === "/terms"}
									onClick={() => history.push("/terms")}
								>
									Terms
								</NavItem>
								<NavItem
									active={pathname === "/terms"}
									onClick={() => history.push("/terms")}
								>
									Privacy Policy
								</NavItem>
							</Nav>
						)}
						<Nav pullRight>
							{signedIn && (
								<NavItem
									active={pathname === "/invoices"}
									onClick={() => history.push("/invoices")}
								>
									Invoices
								</NavItem>
							)}
							{signedIn && (
								<NavItem
									active={pathname === "/newinvoice"}
									onClick={() => history.push("/newinvoice")}
								>
									New Invoice
								</NavItem>
							)}
							{signedIn && (
								<NavItem
									active={pathname === "/settings"}
									onClick={() => history.push("/settings")}
								>
									Settings
								</NavItem>
							)}
							{!signedIn && (
								<NavItem
									active={pathname === "/signup"}
									onClick={() => history.push("/signup")}
									id="register-btn-link"
									className="action-header register-btn"
								>
									Register
								</NavItem>
							)}
							{!signedIn && (
								<NavItem
									active={pathname === "/signin"}
									onClick={() => history.push("/signin")}
									className="action-header login-btn"
								>
									Login
								</NavItem>
							)}
							{signedIn && (
								<NavItem onClick={() => this.signOut()}>
									Sign Out ({user.name})
								</NavItem>
							)}
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>
		);
	}
}

export default withRouter(Header);
