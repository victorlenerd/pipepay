import React, { Component } from 'react';
import './index.css';

class SatisfactionConfirmLink extends Component{
  render(){
    return (
      <div id="container">
      <div className="container">
      <div id="content">
        <div id="amount">
          <p>NGN 25,500</p>
        </div>
        <div id="name">
          <p>Benjamin Dada</p>
        </div>
        <div id="email">
          <p>benjamindada@gmail.com</p>
        </div>
        <div id="button">
          <button>Send Satisfaction Confirmation Link</button>
        </div>
      </div>
      </div>
    </div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <SatisfactionConfirmLink />
    );
  }
}

export default App;
