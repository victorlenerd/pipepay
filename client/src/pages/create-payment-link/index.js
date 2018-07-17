import React, { Component } from 'react';
import './index.css';

class CreatePaymentLink extends Component{
  render(){
    return (
      <div id="container">
<div id="title">
Create Payment<br></br>Link.
</div>
<div id="form">
<form>
  <input type="text" name="customer-email" 
  placeholder="Customer Email" id="c-email"></input>
  <textarea placeholder="Description"></textarea>
  <input type="text" name="" placeholder="Purchase Price"></input>
  <input type="text" name="" placeholder="Delivery Price"></input>
  <input type="submit" name="" value="SEND" id="send"></input>
</form>
</div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <CreatePaymentLink />
    );
  }
}

export default App;
