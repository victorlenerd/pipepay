import React, { Component } from 'react';
import './index.css';

class PaymentRequest extends Component{
  render(){
    return (
      <div id="container">
  <div id="heading">
    <h2>
      This is a payment request from ReallyNiceShirts
    </h2>
  </div>
  <div id="details">
    <p>
      These are the payment details for 5 items including delivery.
    </p>
  </div>
  <div id="price">
    <ul>
      <li>Purchase Price</li>
      <li>NGN 25,000</li>
    </ul>
    <ul>
      <li>Delivery Price</li>
      <li>NGN 500</li>
    </ul>
    <ul>
      <li><b>Total</b></li>
      <li>NGN 25,500</li>
    </ul>
  </div>
  <div id="pay">
    <button>PAY NOW</button>
  </div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <PaymentRequest />
    );
  }
}

export default App;
