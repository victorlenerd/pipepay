import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './pages/sign-in';
import SetPaymentAccount from './pages/sign-in';
import SendPaymentLink from './pages/send-payment-link';
import SatisfactionConfirmLink from './pages/satisfaction-confirm-link';
import Pipe from './pages/sign-in';
import PhoneVerification from './pages/sign-in';
import GetStarted from './pages/get-started';
import Forward from './pages/forward';
import DissatisfactionReason from './pages/dissatisfaction-reason';
import CreatePaymentLink from './pages/create-payment-link';
import CreateAnAccount from './pages/create-an-account';
import CreatePassword from './pages/change-password';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
