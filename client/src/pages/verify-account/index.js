import React, { PureComponent } from 'react';
import { confirmRegistration, signin, userPool } from 'utils/auth';
import NProgress from 'nprogress';

class VerifyAccount extends PureComponent {
    constructor() {
        super();
        this.state = {
            error: null
        };

        this.submit = this.submit.bind(this);
    }
    
    async submit(e) {
        e.preventDefault();
        const { username, password } = this.props.location.state;

        if (this.formEl.checkValidity() === true) {
			const verifycode =  e.target.verifycode.value;
            NProgress.start();
			try {
				await confirmRegistration(username, verifycode);
                await signin(username, password);
                
                const cognitoUser = userPool.getCurrentUser();
                cognitoUser.getSession((err, result) => {
                    if (result && result.isValid()) {
                        NProgress.done();
                        this.props.history.push('/dashboard');
                        return;
                    } else {
                        this.setState({
                            error: err.message
                        });   
                    }
                });
			} catch({ message }) {
				this.setState({
					error: message
				});
			}
			NProgress.done();
		} else {
			this.setState({ error: "Please fill all the required fields." });
		}
    }

    render() {
        return (
            <div id="container">
			<div className="container">
				<div className="header">
                    <h1>Verify Your Email.</h1>
                    <p>Please enter the verification code sent to your mail.</p>
				</div>
				<div className="form">
					<form ref={e => this.formEl = e} name="reg-form" onSubmit={this.submit}>
						{(this.state.error !== null) && (<div className="form-error">{this.state.error}</div>)}
						<label htmlFor="firstname">Verification Code</label>
						<input type="text" name="verifycode" placeholder="Enter your code" className="text-input" required />
						<input type="submit" name="sign up" value="SUBMIT" className="text-submit" />
					</form>
				</div>
			</div>
		</div>
        );
    }
}

export default VerifyAccount;