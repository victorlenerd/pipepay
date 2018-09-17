import React, { Component } from 'react';

class DissatisfactionReason extends Component{
  render(){
    return (
      <div id="container">
	<div className="container">
	<div className="header">
		<h2>Why Don't You Like It.</h2>
	</div>
	<div className="form">
		<form>
			<textarea placeholder="Tell us why you aren't satisfied with your purchase"></textarea>
			<div className="header" id="header2">
			<h2>
				 Account Details.
			</h2>
		</div>
			<input type="text" name="bank name" placeholder="Bank Name" className="text-input"></input>
			<input type="text" name="account number" placeholder="Account Number" className="text-input"></input>
			<input type="submit" name="send" value="DONE" className="text-submit"></input>
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
      <DissatisfactionReason />
    );
  }
}

export default App;
