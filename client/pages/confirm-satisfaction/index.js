import React, { Component } from 'react';
import './index.css';

class ConfirmSatisfaction extends Component{
  render(){
    return (
        <div id="container">
	<div className="container">
	<div id="words">
		<p>
			Please Confirm Your Satisfaction For Your 
			Purchase From
		</p>
		<p id="merchant-name"> Really Nice Shirt.</p>
	</div>
	<div id="buttons">
		<button>I Like The Product.</button>
		<button>I Don't Like The Product.</button>
	</div>
	</div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <ConfirmSatisfaction />
    );
  }
}

export default App;
