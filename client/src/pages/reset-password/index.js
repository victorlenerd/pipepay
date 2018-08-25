import React, { PureComponent } from 'react';
import NProgress from 'nprogress';
import { confirmPassword } from 'utils/auth';

class App extends PureComponent {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.state = {
            error: null
        }
    }

    async submit(e) {
        e.preventDefault();
        const { username } = this.props.location.state;

		if (this.formEl.checkValidity() === true) {
            const password =  e.target.password.value;
            const code =  e.target.code.value;
            NProgress.start();
            try {
                await confirmPassword(username, code, password);
                this.props.history.push('/signin');
            } catch({message}) {
                this.setState({ error: message });
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
                        <h2>Change Password</h2>
                    </div>
                    <div className="form">
                        <form ref={e => this.formEl = e} name="reg-form" onSubmit={this.submit}>
                            {(this.state.error !== null) && (<div className="form-error">{this.state.error}</div>)}
                            <label htmlFor="code">Code</label>
                            <input type="text" name="code" placeholder="Code" className="text-input" required />
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Confirm Password" className="text-input" required />
                            <input type="submit" name="done" value="DONE" className="text-submit"></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
