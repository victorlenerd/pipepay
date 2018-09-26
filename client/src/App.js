import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AppContext from 'contexts/app.context';

import Home from 'pages/home';
import SignIn from 'pages/signin';
import CreateAnAccount from 'pages/signup';
import ForgotPassword from 'pages/forgot-password';
import VerifyAccount from 'pages/verify-account';
import ResetPassword from 'pages/reset-password';
import VerifyAccn from 'pages/verify-accn';

import SendPaymentLink from 'pages/send-payment-link';
import DissatisfactionReason from 'pages/dissatisfaction-reason';
import CreatePaymentLink from 'pages/create-payment-link';
import ConfirmSatisfaction from 'pages/confirm-satisfaction';

import Invoices from 'pages/invoices';
import NewInvoice from 'pages/newinvoice';

import Header from 'components/header';

import { init } from 'utils/auth';

import 'styles/nprogress.css';
import 'styles/bootstrap.min.css';

const withHeader = (Comp) => (
  <React.Fragment>
    <Header />
    <Comp />
  </React.Fragment>
)

class App extends Component {
  constructor(){
    super();
    this.state = {
      signedIn: false,
      user: null,

      setCurrentUser: (user) => this.setState({ user, signedIn: user !== null })
    };
  }

  componentWillMount() {
    try {
      init() 
      .getCurrentUser()
      .getSession(async (err, result) => {
        if (result && result.isValid()) {
          const { idToken: { payload } } = result;
          this.state.setCurrentUser(payload);
        } else {
          this.state.setCurrentUser(null);        }
      });
    } catch(err) {
      this.state.setCurrentUser(null);
    }
  }

  render() {
    const { signedIn } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider value={this.state}>
          <Switch>
            <Route exact path="/" render={()=> !signedIn ? <Home /> : <Redirect to="/invoices" />} />
            <Route path="/signin" render={()=> !signedIn ? <SignIn {...this.state} /> : <Redirect to="/" />} />
            <Route path="/signup" render={()=> !signedIn ? <CreateAnAccount />: <Redirect to="/" />} />
            <Route path="/forgotpassword" render={()=> !signedIn ? <ForgotPassword />: <Redirect to="/" />} />
            <Route path="/verifyemail" render={()=> !signedIn ? <VerifyAccount />: <Redirect to="/" />} />
            <Route path="/resetpassword" render={()=> !signedIn ? <ResetPassword />: <Redirect to="/" />} />
            <Route path="/verifyaccn" render={()=> signedIn ? <VerifyAccn />: <Redirect to="/" />} />
            
            <Route path="/invoices" render={()=> signedIn ? withHeader(Invoices): <Redirect to="/" />} />
            <Route path="/newinvoice" render={()=> signedIn ? withHeader(NewInvoice): <Redirect to="/" />} />

            <Route path="/reason" component={DissatisfactionReason} />
            <Route path="/confirm/:invoiceId" component={ConfirmSatisfaction} />
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;