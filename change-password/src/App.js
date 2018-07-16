import React, { Component } from 'react';
import './App.css';

class ChangePassword extends Component{
  render(){
    return (
      <div id="container">
  <div id="heading1">
  <h2>
    Change Password
  </h2>
</div>
  <form>
    <input type="text" name="password" placeholder="Password"></input>
      <input type="text" name="confirm password" placeholder="Confirm Password"></input>
      <input type="submit" name="done" value="DONE"></input>
  </form>
    
     <div id="heading2">
  <h2>
    Account Details
  </h2>
</div>
  <form>
    <input type="text" name="bank name" placeholder="Bank Name"></input>
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
      <ChangePassword />
    );
  }
}

export default App;
