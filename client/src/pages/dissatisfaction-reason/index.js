import React, { Component } from 'react';
import './index.css';

class DissatisfactionReason extends Component{
  render(){
    return (
      <div id="container">
  <div id="heading">
    <h1>Why Don't You Like It.</h1>
  </div>
  <div id="form">
    <form>
      <textarea placeholder="Tell us why you aren't satisfied with your purchase"></textarea>
      <div id="heading2">
      <h2>
         Account Details.
      </h2>
    </div>
      <input type="text" name="bank name" placeholder="Bank Name"></input>
      <input type="text" name="account number" placeholder="Account Number"></input>
      <input type="submit" name="send" value="DONE"></input>
    </form>
  </div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <DissatisfactionReason />
    );
  }
}

export default App;
