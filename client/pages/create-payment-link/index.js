import React, { Component } from 'react';
import './index.css';

class CreatePaymentLink extends Component{
  render(){
    return (
      <div id="container">
		<div className="container">
<div className="header">
	<h2>
Create Payment<br></br>Link.
</h2>
</div>
<div className="form">
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
