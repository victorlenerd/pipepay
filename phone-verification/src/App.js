import React, { Component } from 'react';
import './App.css';

class PhoneVerification extends Component{
  constructor(props){
    super(props);

    this.state={
      boxOne:'',
      boxTwo:'',
      boxThree:'',
      boxFour:'',
      count:0
    }
  }

componentDidMount(){
     this.setState({
      boxOne:document.getElementsByClassName("pin")[0],
      boxTwo:document.getElementsByClassName("pin")[1],
      boxThree:document.getElementsByClassName("pin")[2],
      boxFour:document.getElementsByClassName("pin")[3]
     });

     window.onload= ()=> {
  this.state.boxOne.focus();
  }

  this.handleBox1 = this.handleBox1.bind(this);
  this.handleBox2 = this.handleBox2.bind(this);
  this.handleBox3 = this.handleBox3.bind(this);
  this.handleBox4 = this.handleBox4.bind(this);

}

  handleBox1(){
    let number = this.state.boxOne.value.length + 1;
  if (number <= 1)
{this.state.boxOne.focus();}
else
{this.state.boxTwo.focus();}
  }

  handleBox2(){
    let number1= this.state.boxTwo.value.length + 1;
  if (number1 <= 1)
{this.state.boxTwo.focus();}
else
{this.state.boxThree.focus();}
  }

  handleBox3(){
     let number2= this.state.boxThree.value.length + 1;
  if (number2 <= 1)
{this.state.boxThree.focus();}
else
{this.state.boxFour.focus();}
  }

  handleBox4(){
    let number3= this.state.boxFour.value.length + 1;
  if (number3 <= 1)
{this.state.boxFour.focus();}
  }

  render(){
    return (
      <div id="container">
  <div id="heading">
    <h2>Phone Number Verification.</h2>
  </div>
  <div id="instruction">
    <p>Please enter the verification code sent to your phone.</p>
  </div>
  <div id="form">
    <form>
      <input type="text" name="first" maxlength="1" className="pin" onKeyUp={this.handleBox1}></input>
      <input type="text" name="second" maxlength="1" className="pin" onKeyUp={this.handleBox2}></input>
      <input type="text" name="third" maxlength="1" className="pin" onKeyUp={this.handleBox3}></input>
      <input type="text" name="fourth" maxlength="1" className="pin" onKeyUp={this.handleBox4}></input>
    </form>
  </div>
  <div id="button">
    <button>VERIFY</button>
  </div>
  <div id="resend">
    <button>Resend Verification Code</button>
  </div>
</div>
      );
  }
}

class App extends Component {
  render() {
    return (
     <PhoneVerification />
    );
  }
}

export default App;
