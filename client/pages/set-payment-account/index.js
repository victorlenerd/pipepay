import React, { Component } from 'react';

import './index.css';

class SetPaymentAccount extends Component{
  render(){
    return (
      <div id="container">
  <div id="heading">
    <h2>Account Details</h2>
  </div>
  <div id="instruction">
    <p>Please set account to be used for payments.</p>
  </div>
  <form>
    <input type="text" name="choose bank" placeholder="Choose Bank"></input>
      <input type="text" name="account number" placeholder="Account Number"></input>
      <input type="submit" name="send" value="DONE"></input>
  </form>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <SetPaymentAccount />
    );
  }
}

export default App;
