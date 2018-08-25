import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from 'pages/signin';
import CreateAnAccount from 'pages/signup';
import ForgotPassword from 'pages/forgot-password';
import ChangePassword from 'pages/change-password';
import VerifyAccount from 'pages/verify-account';
import ResetPassword from 'pages/reset-password';

import SetPaymentAccount from './pages/set-payment-account';
import SendPaymentLink from './pages/send-payment-link';
import SatisfactionConfirmLink from './pages/satisfaction-confirm-link';
import Forward from './pages/forward';
import DissatisfactionReason from './pages/dissatisfaction-reason';
import CreatePaymentLink from './pages/create-payment-link';
import ConfirmSatisfaction from './pages/confirm-satisfaction';

import { init } from 'utils/auth';

import 'styles/nprogress.css';

class App extends Component {
  componentWillMount() {
    init();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={CreateAnAccount} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/verifyemail" component={VerifyAccount} />
          <Route path="/resetpassword" component={ResetPassword} />

          <Route path="/dashboard" component={CreatePaymentLink} />
          <Route path="/send-payment-link" component={SendPaymentLink} />
          <Route path="/forward" component={Forward} />
        
          <Route path="/satisfaction" component={SatisfactionConfirmLink} />
          <Route path="/accountinfo" component={SetPaymentAccount} />
          <Route path="/reason" component={DissatisfactionReason} />
          <Route path="/confirmation" component={ConfirmSatisfaction} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
