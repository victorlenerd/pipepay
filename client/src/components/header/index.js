import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import AppContext from 'contexts/app.context';
import { signOut } from 'utils/auth';

class Header extends React.PureComponent {
    signOut = (user)=> {
        signOut(user['cognito:username']);
        this.props.history.push('/')
    }

    render () {
        const { location: { pathname } } = this.props

        return (
            <AppContext.Consumer>
                {({ user, signedIn }) => (
                    <Navbar fixedTop collapseOnSelect>
                        <div className="container">
                            <Navbar.Header>
                                {!signedIn && <Link to="/" className="navbar-brand">PipePay</Link>}
                                {signedIn && <Link to="/invoices" className="navbar-brand">PipePay</Link>}
                                <Navbar.Toggle/>
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    {signedIn && <NavItem active={pathname === '/invoices'} onClick={()=> this.props.history.push('/invoices')}>Invoices</NavItem>}
                                    {signedIn && <NavItem active={pathname === '/newinvoice'} onClick={()=> this.props.history.push('/newinvoice')}>New Invoice</NavItem>}
                                    {!signedIn && <NavItem active={pathname === '/signup'} onClick={()=> this.props.history.push('/signup')}>Sign Up</NavItem>}
                                    {!signedIn && <NavItem active={pathname === '/signin'} onClick={()=> this.props.history.push('/signin')}>Sign In</NavItem>}
                                    {signedIn && <NavItem onClick={() => this.signOut(user)}>Sign Out ({user.name})</NavItem>}
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Navbar>
                )}
            </AppContext.Consumer>
        );
    }
};

export default withRouter(Header);