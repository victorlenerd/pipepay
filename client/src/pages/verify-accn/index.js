import React from 'react';
import NProgress from 'nprogress';
import { cognitoUser, setAttributes } from 'utils/auth';

class VerifyAccn extends React.PureComponent {
    constructor() {
		super();
		this.state = {
            error: null,
            canSubmit: false,
            bankCode: null,
            banks: [],
            accountNumber: '',
            accountName: ''
		};

		this.submit = this.submit.bind(this);
		this.next = this.next.bind(this);
    }

    async componentWillMount() {
        NProgress.start();
        fetch('/api/banks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }  
        })
        .then((res) => res.json())
        .then((res) => {
            NProgress.done();
            const { success, data: banks } = res;
            if (success) this.setState({ banks });
        });
    }
    
    submit = (e) => {
        const { bankCode, accountNumber } = this.state;
        e.preventDefault();
        NProgress.start();
        cognitoUser.getSession(async (err, result) => {
            if (result && result.isValid()) {
                const attributes = [
                    { "Name": "custom:bank_code", "Value": bankCode },
                    { "Name": "custom:account_number", "Value": accountNumber }
                ];

                try {
                    await setAttributes(attributes);
                    NProgress.done();
                    this.props.history.push('/dashboard');
                } catch (err) {
                    return this.setState({ error: err.message })
                }
            }

            this.setState({ error: err })
        });
    }

    setAccountNumber = (e) => { this.setState({ accountNumber: e.target.value, canSubmit: false, accountName: '' }); } 

    next = () => {
        const { accountNumber, bankCode } = this.state;
        NProgress.start();
        fetch(`/api/banks/verify/${bankCode}/${accountNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }  
        })
        .then((res) => res.json())
        .then((res) => {
            NProgress.done();
            const { success, data: { account_name: accountName } } = res;
            if (success) this.setState({ accountName, canSubmit: true });
        })
        .catch(() => {
            NProgress.done();
            this.setState({
                error: 'Cannot resolve account number'
            });
        });
    }

    render() {
        const { banks, error, canSubmit, accountName } = this.state;

        return (
            <div id="container">
                <div className="container">
                    <div className="header">
                        <h1>Set Up Account Details.</h1>
                    </div>

                    <div className="form">
                    <form ref={e => this.formEl = e} name="account-form">
                            {(error !== null) && (<div className="form-error">{error}</div>)}
                            <label htmlFor="bank">Select Bank</label>
                            <div>
                                <select className="text-input" required name="selectbank" onChange={(e) => this.setState({ bankCode: e.target.value, canSubmit: false, accountName: '' })}>
                                    {banks.map((bank) => {
                                        return (<option value={bank.code} key={bank.code}>{bank.name}</option>)
                                    })}
                                </select>
                            </div>
                            <br />
                            <label htmlFor="">Account Number</label>
                            <input type="text" name="accountnumber" onChange={this.setAccountNumber} placeholder="Account Number" maxchar="10" className="text-input" required />

                            <label htmlFor="">Account Name</label>
                            <p className="text-input">{accountName}</p>

                            {!canSubmit && <input type="button" id="next-btn" value="VERIFY ACCOUNT NUMBER" onClick={this.next} className="text-submit" />}
                            {canSubmit && <input type="submit" id="submit-btn" value="DONE" onClick={this.submit} className="text-submit" />}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerifyAccn;