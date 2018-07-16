import React, { Component } from 'react';
import './App.css';

class GetStarted extends Component{
  render(){
    return (
      <div id="container">
  <div id="heading">
    <h2>
      Get Started.
    </h2>
  </div>
  <div id="logo">
    
  </div>
  <div id="motto">
    <p>
      Build trust with more customers.
    </p>
  </div>
  <div id="signing_options">
    <button>Create A New Account</button>
    <button>Have An Existing Account</button>
  </div>
  <div id="words">
    <p>By signing up, you agree to our terms and conditions.</p>
  </div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <GetStarted />
    );
  }
}

export default App;
