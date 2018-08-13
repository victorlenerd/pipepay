import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './pages/sign-in';
import SetPaymentAccount from './pages/set-payment-account';
import SendPaymentLink from './pages/send-payment-link';
import SatisfactionConfirmLink from './pages/satisfaction-confirm-link';
import PhoneVerification from './pages/sign-in';
import GetStarted from './pages/get-started';
import Forward from './pages/forward';
import DissatisfactionReason from './pages/dissatisfaction-reason';
import CreatePaymentLink from './pages/create-payment-link';
import CreateAnAccount from './pages/create-an-account';
import CreatePassword from './pages/change-password';
import ConfirmSatisfaction from './pages/confirm-satisfaction';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/create-an-account" component={CreateAnAccount} />
          <Route path="/change-password" component={CreatePassword} />
          <Route path="/create-payment-link" component={CreatePaymentLink} />
          <Route path="/send-payment-link" component={SendPaymentLink} />
          <Route path="/forward" component={Forward} />

        
          <Route path="/satisfaction-confirm-link" component={SatisfactionConfirmLink} />
          <Route path="/set-payment-account" component={SetPaymentAccount} />
          <Route path="/phone-verification" component={PhoneVerification} />
          <Route path="/dissatisfaction-reason" component={DissatisfactionReason} />
          <Route path="/confirm-satisfaction" component={ConfirmSatisfaction} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
