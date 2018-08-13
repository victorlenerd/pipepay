import React, { Component } from 'react';
import './index.css';

class CreateAnAccount extends Component{
  render(){
    return (
      <div id="container">
    <div id="title">
      <h1>
  Create An Account.
</h1>
</div>
<div id="form">
  <form>
    <input type="text" name="name" placeholder="Name"></input>
    <input type="text" name="phone no" placeholder="Phone Number"></input>
    <input type="text" name="password" placeholder="Password"></input>
    <input type="submit" name="sign up" value="SIGN UP"></input>
  </form>
</div>

<div id="word1">
  <p>Don't Have An Existing Account</p>                                                   
</div>
<div id="word2">
  <p>
    By signing up, you agree to our terms and conditions
  </p>
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
