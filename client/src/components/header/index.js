import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import AppContext from "contexts/app.context";
import { signOut } from "utils/auth";

class Header extends React.PureComponent {
  signOut = (user, setCurrentUser) => {
  	signOut(user["cognito:username"]);
  	setCurrentUser(null);
  	this.props.history.push("/");
  };

  render() {
  	const {
  		location: { pathname }
  	} = this.props;

  	return (
  		<AppContext.Consumer>
  			{({ user, signedIn, setCurrentUser }) => (
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
  							{pathname === "/" && (
  								<Nav pullLeft>
  									<NavItem
  										active={pathname === "/howitworks"}
  										onClick={() => this.props.history.push("/howitworks")}
  									>
                      How It Works
  									</NavItem>
  									<NavItem
  										active={pathname === "/faq"}
  										onClick={() => this.props.history.push("/faq")}
  									>
                      F.A.Q
  									</NavItem>
  									<NavItem
  										active={pathname === "/terms"}
  										onClick={() => this.props.history.push("/terms")}
  									>
                      Terms
  									</NavItem>
  									<NavItem
  										active={pathname === "/terms"}
  										onClick={() => this.props.history.push("/terms")}
  									>
                      Privacy Policy
  									</NavItem>
  								</Nav>
  							)}
  							<Nav pullRight>
  								{signedIn && (
  									<NavItem
  										active={pathname === "/invoices"}
  										onClick={() => this.props.history.push("/invoices")}
  									>
                      Invoices
  									</NavItem>
  								)}
  								{signedIn && (
  									<NavItem
  										active={pathname === "/newinvoice"}
  										onClick={() => this.props.history.push("/newinvoice")}
  									>
                      New Invoice
  									</NavItem>
  								)}
  								{signedIn && (
  									<NavItem
  										active={pathname === "/settings"}
  										onClick={() => this.props.history.push("/settings")}
  									>
                      Settings
  									</NavItem>
  								)}
  								{!signedIn && (
  									<NavItem
  										active={pathname === "/signup"}
  										onClick={() => this.props.history.push("/signup")}
  										id="register-btn-link"
  										className="action-header register-btn"
  									>
                      Register
  									</NavItem>
  								)}
  								{!signedIn && (
  									<NavItem
  										active={pathname === "/signin"}
  										onClick={() => this.props.history.push("/signin")}
  										className="action-header login-btn"
  									>
                      Login
  									</NavItem>
  								)}
  								{signedIn && (
  									<NavItem onClick={() => this.signOut(user, setCurrentUser)}>
                      Sign Out ({user.name})
  									</NavItem>
  								)}
  							</Nav>
  						</Navbar.Collapse>
  					</div>
  				</Navbar>
  			)}
  		</AppContext.Consumer>
  	);
  }
}

Header.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object
};

export const withHeader = Comp => (
	<React.Fragment>
		<Header />
		<Comp />
	</React.Fragment>
);

export default withRouter(Header);
