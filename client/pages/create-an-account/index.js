import React, { Component } from 'react';
import './index.css';

class CreateAnAccount extends Component{
  render(){
    return (
	<div id="container">
		<div className="container">
		<div className="header">
			<h2>
	Create An Account.
</h2>
</div>
<div className="form">
	<form>
		<input type="text" name="name" placeholder="Name"></input>
		<input type="text" name="phone no" placeholder="Phone Number"></input>
		<input type="text" name="password" placeholder="Password"></input>
		<input type="submit" name="sign up" value="SIGN UP"></input>
	</form>
</div>

<div className="word">
	<p>Don't Have An Existing Account</p>
</div>
<div className="word">
	<p>
		By signing up, you agree to our terms and conditions.
	</p>
</div>
</div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <CreateAnAccount />
    );
  }
}

export default App;
