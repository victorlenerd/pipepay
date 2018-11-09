//@flow
import React from "react";
import VerifyAccountNumberContainer from "../../containers/verify-account-number.container";
import { changePassword } from "../../utils/auth";
import AppContext from "../../contexts/app.context";
import NProgress from "nprogress";

type Props = {};

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

	changePassword = (e: any) => {
		const { oldPassword, newPassword, confirmPassword } = this.state;

		e.preventDefault();

		if (newPassword === confirmPassword) {
			NProgress.start();
			changePassword(
				this.context.user["cognito:username"],
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
		return (
			<AppContext.Consumer>
				{context => {
					this.context = context;

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
													name="oldpassword"
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
													name="newpassword"
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
													name="confirmpassword"
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
									<h2>Change Email</h2>
									<br />
									<br />
									<div className="form-setting-section">
										<form name="change-password-setting">
											<label>New Email</label>
											<input
												type="text"
												className="text-input"
												id="new-email"
												name="newemail"
											/>
											<br />
											<br />
											<input
												type="submit"
												name="submit"
												className="text-submit text-submit-remove-margin"
												value="Update E-mail"
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
														ref={e => (this.formEl = e)}
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
														<label htmlFor="bank">Select Bank</label>
														<div>
															<select
																className="text-input"
																required
																name="selectbank"
																onChange={e => setBankCode(e.target.value)}
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
															name="accountnumber"
															onChange={e => setAccountNumber(e.target.value)}
															placeholder="Account Number"
															maxchar="10"
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
