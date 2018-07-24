import React, { Component } from 'react';
import './index.css';

class SignIn extends Component{
  render(){
    return (
      <div id="container">
	<div className="container">
	<div className="header">
		<h2>
		Sign In.
		</h2>
	</div>
	<div className="form">
		<form>
			<input type="text" name="Phone-Number"
			 placeholder="Phone Number"></input>
			 <input type="text" name="Password" placeholder="Password"></input>
			 <a href="#forgot" id="forgot">Forgot Password?</a>
			 
			 <input type="submit" name="sign-in" value="SIGN IN"></input>
			
		</form>
		<div id="have-account">
			<a href="#acan">Already Created An Account</a>
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
      <SignIn />
    );
  }
}

export default App;
