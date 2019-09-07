import React from "react";
import NProgress from "nprogress";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getSession, setAttributes } from "../../utils/auth";

interface Props {
	user: any,
	setCurrentUser: (user: any) => void
};

class VerifyBackAccount extends React.PureComponent<Props & RouteComponentProps> {

	state = {
			error: null,
			canSubmit: false,
			bankCode: null,
			banks: [],
			accountNumber: "",
			accountName: ""
	};

	formEl = React.createRef<HTMLFormElement>();

	fetchBanks = async () => {
		NProgress.start();
		fetch("/api/banks", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				NProgress.done();
				const { success, data: banks } = res;
				if (success) this.setState({ banks, bankCode: banks[0].code });
			});
	};

	submit = e => {
		const { user, setCurrentUser } = this.props;
		const { bankCode, accountNumber } = this.state;
		e.preventDefault();
		NProgress.start();
		getSession(user["cognito:username"])
			.then(async result => {
				if (result && result.isValid()) {
					const attributes = [
						{ Name: "custom:bank_code", Value: bankCode },
						{ Name: "custom:account_number", Value: accountNumber }
					];

					try {
						await setAttributes(attributes);
						setCurrentUser(
							Object.assign({}, user, {
								"custom:bank_code": bankCode,
								"custom:account_number": accountNumber
							})
						);
						NProgress.done();
						this.props.history.push("/invoices");
					} catch (err) {
						return this.setState({ error: err.message });
					}
				}
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
	};

	setAccountNumber = e => {
		this.setState({
			accountNumber: e.target.value,
			canSubmit: false,
			accountName: ""
		});
	};

	next = () => {
		const { accountNumber, bankCode } = this.state;
		NProgress.start();
		fetch(`/api/banks/verify/${bankCode}/${accountNumber}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				NProgress.done();
				const { success } = res;

				if (success) {
					this.setState({
						accountName: res.data.account_name,
						canSubmit: true
					});
				} else {
					this.setState({ error: res.error.message, canSubmit: false });
				}
			})
			.catch(() => {
				NProgress.done();
				this.setState({
					error: "Cannot resolve account number"
				});
			});
	};

	render() {
		const { banks, error, canSubmit, accountName } = this.state;

		return (
			<div id="container">
				<div className="container-main">
					<div className="container">
						<div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12">
							<div className="header">
								<h1>Set Up Account Details.</h1>
							</div>
							<br />
							<br />
							<div className="form">
								<form ref={this.formEl} name="account-form">
									{error !== null && <div className="form-error">{error}</div>}
									<label htmlFor="bank">Select Bank</label>
									<div>
										{banks &&
											banks.length > 0 && (
												<select
													className="text-input"
													required
													name="selectbank"
													onChange={e =>
														this.setState({
															bankCode: e.target.value,
															canSubmit: false,
															accountName: ""
														})
													}
												>
													{banks.map((bank, i) => {
														return (
															<option value={bank.code} key={bank.code}>
																{bank.name}
															</option>
														);
													})}
												</select>
											)}
									</div>
									<br />
									<label htmlFor="">Account Number</label>
									<input
										type="text"
										name="accountnumber"
										onChange={this.setAccountNumber}
										placeholder="Account Number"
										className="text-input"
										required
									/>
									<br />
									<br />
									{!canSubmit && (
										<input
											type="button"
											id="next-btn"
											value="VERIFY ACCOUNT NUMBER"
											onClick={this.next}
											className="text-submit"
										/>
									)}
									<label htmlFor="">Account Name</label>
									<p className="text-input">{accountName}</p>
									<br />
									<br />
									{canSubmit && (
										<input
											type="submit"
											id="submit-btn"
											value="DONE"
											onClick={this.submit}
											className="text-submit"
										/>
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(VerifyBackAccount);
