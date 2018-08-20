import React, { PureComponent } from 'react';

class ForgotPassword extends PureComponent {
    constructor() {
        super();
        this.state = {
            error: null
        };
    }

    submit = () => {}

    render() {
        return (
            <div id="container">
                <div className="container">
                    <div className="header">
                        <h1>Forgot Password.</h1>
                    </div>
                    <div className="form">
                        <form onSubmit={this.submit}>
                            <input type="email" name="email" placeholder="Email" className="text-input" />
                            <input type="submit" name="sign-in" value="SUBMIT" className="text-submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;