import React from "react";
import NProgress from "nprogress";
import VerifyAccountNumberContainer from "../../containers/verify-account-number.container";
import { changePassword } from "../../utils/auth";
import AppContext from "../../contexts/app.context";

type Props = {
	user: {}
};

type State = {
	error: null | string,
	passwordChangeSuccess: boolean | null,
	oldPassword: string,
	newPassword: string,
	confirmPassword: string
};

class Settings extends React.PureComponent<Props, State> {
	state = {
		error: "",
		passwordChangeSuccess: null,
		oldPassword: "",
		newPassword: "",
		confirmPassword: ""
	};

	formEl = React.createRef<HTMLFormElement>();

	appContext: any;

	changePassword = (e: any) => {
		const { oldPassword, newPassword, confirmPassword } = this.state;

		e.preventDefault();

		if (newPassword === confirmPassword)	 {
			NProgress.start();
			changePassword(
				this.appContext.user["cognito:username"],
				oldPassword,
				newPassword
			)
				.then(result => {
					this.setState({ passwordChangeSuccess: true });
				})
				.catch(err => {
					this.setState({ passwordChangeSuccess: false, error: err.message });
				})
				.finally(() => {
					NProgress.done();
				});
		}
	};

	render() {
		const { passwordChangeSuccess, error } = this.state;
		const { user } = this.props;

		return (
			<AppContext.Consumer>
				{context => {
					this.appContext = context;

					return (
						<section className="section">
							<div className="container">
								<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
									<h2>Change Password</h2>
									<br />
									<br />
									{passwordChangeSuccess === true && (
										<div className="alert alert-success">
											Password has been changed successfully
										</div>
									)}
									{passwordChangeSuccess === false && (
										<div className="alert alert-danger">{error}</div>
									)}
									<div className="form-setting-section">
										<form
											name="change-password-setting"
											onSubmit={this.changePassword}
										>
											<div>
												<label>Old Password</label>
												<input
													type="password"
													className="text-input"
													id="old-password"
													name="old-password"
													onChange={e =>
														this.setState({ oldPassword: e.target.value })
													}
												/>
											</div>
											<br />
											<div>
												<label>New Password</label>
												<input
													type="password"
													className="text-input"
													id="new-password"
													name="new-password"
													onChange={e =>
														this.setState({ newPassword: e.target.value })
													}
												/>
											</div>
											<br />
											<div>
												<label>Confirm Password</label>
												<input
													type="password"
													className="text-input"
													id="confirm-password"
													name="confirm-password"
													onChange={e =>
														this.setState({ confirmPassword: e.target.value })
													}
												/>
											</div>
											<br />
											<br />
											<input
												type="submit"
												name="submit"
												className="text-submit text-submit-remove-margin"
												value="Update Password"
											/>
										</form>
									</div>
									<h2>Change Account Number</h2>
									<br />
									<br />
									<div className="form-setting-section">
										<VerifyAccountNumberContainer>
											{({
												accountName,
												accountNumber,
												bankCode,
												banks,
												canSubmit,
												success,
												error,
												setAccountNumber,
												setBankCode,
												verifyAccountNumber,
												updateAccountNumber
											}) => {
												return (
													<form
														ref={this.formEl}
														name="account-form"
													>
														{success === true && (
															<div className="alert alert-success">
																Account Number Successfully Updated
															</div>
														)}
														{success === false && (
															<div className="alert alert-danger">
																Could Not Update Account Number {error}
															</div>
														)}
														{error && (
															<div className="alert alert-danger">{error}</div>
														)}
														<label htmlFor="bank">Select Bank</label>
														<div>
															<select
																className="text-input"
																required
																name="select-bank"
																onChange={e => setBankCode(e.target.value)}
																defaultValue={bankCode}
															>
																{banks.map(bank => {
																	return (
																		<option value={bank.code} key={bank.code}>
																			{bank.name}
																		</option>
																	);
																})}
															</select>
														</div>
														<br />
														<br />
														<label htmlFor="">Account Number</label>
														<input
															type="text"
															name="account-number"
															defaultValue={accountNumber}
															onChange={e => setAccountNumber(e.target.value)}
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
																onClick={verifyAccountNumber}
																className="text-submit text-submit-remove-margin"
															/>
														)}
														<br />
														<br />
														<label htmlFor="">Account Name</label>
														<p className="text-input">{accountName}</p>
														<br />
														<br />
														{canSubmit && (
															<input
																type="submit"
																id="submit-btn"
																value="Update Bank Account"
																onClick={updateAccountNumber}
																className="text-submit text-submit-remove-margin"
															/>
														)}
													</form>
												);
											}}
										</VerifyAccountNumberContainer>
									</div>
								</div>
							</div>
						</section>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

export default Settings;
