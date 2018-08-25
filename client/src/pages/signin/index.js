import React, { PureComponent } from 'react';
import './index.css';
import { signin, userPool } from 'utils/auth';
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';

class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			error: null
		};

		this.submit = this.submit.bind(this);
	}

	async submit (e) {
		e.preventDefault();
		if (this.formEl.checkValidity() === true) {
			const email =  e.target.email.value;
			const password =  e.target.password.value;
			const username = email.split('@')[0];

			try {
                NProgress.start();
                await signin(username,  password);
				const cognitoUser = userPool.getCurrentUser();
				cognitoUser.getSession((err, result) => {
					if (result && result.isValid()) {
						NProgress.done();
						this.props.history.push('/dashboard');
						return;
					}

					this.setState({ error: err.message })
				});
			} catch(err) {
                NProgress.done();
                if (err.code === "UserNotConfirmedException") {
                    return this.props.history.push('/verifyemail', { username,  password });
				}
				this.setState({ error: err.message })
			}
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
	}

  render(){
    return (
		<div id="container">
			<div className="container">
				<div className="header">
					<h1>Sign In.</h1>
				</div>

				<div className="form">
				<form ref={e => this.formEl = e} name="reg-form" onSubmit={this.submit}>
						{(this.state.error !== null) && (<div className="form-error">{this.state.error}</div>)}
						<label htmlFor="email">Email</label>
						<input type="email" name="email" placeholder="Email" className="text-input" required />
						<label htmlFor="password">Password</label>
						<input type="password" name="password" placeholder="Password" className="text-input" required />
						<Link to="forgotpassword" id="forgot">Forgot Password?</Link>
						<input type="submit" name="sign-in" value="SIGN IN" className="text-submit" />
					</form>
					<div id="have-account">
						<Link to="signup">Already Created An Account</Link>
					</div>
				</div>
			</div>
		</div>
      );
  }
}

export default App;
