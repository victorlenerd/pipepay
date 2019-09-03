import * as React from "react";
import AppContext from "../contexts/app.context";
import nprogress from "nprogress";
import { setAttributes } from "../utils/auth";

interface IProps {
	children: (any) => React.ReactNode
};

interface IState {
	banks: Array<any>,
	error ?: null,
	success: boolean | null,
	canSubmit: boolean,
	bankCode: string,
	accountNumber: string,
	accountName: string
};

class VerifyAccountNumberContainer extends React.PureComponent<IProps> {
	appContext: any;

	state: IState ={
		error: null,
		canSubmit: false,
		bankCode: "",
		success: null,
		banks: [],
		accountNumber: "",
		accountName: ""
	};

	componentDidMount() {
		this.fetchBanks();
	}

	fetchBanks = async () => {
		nprogress.start();
		fetch("/api/banks", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				nprogress.done();
				const { success, data: banks } = res;
				if (success)
					this.setState({
						banks,
						accountNumber: this.appContext.user["custom:account_number"],
						bankCode: this.appContext.user["custom:bank_code"]
					});
			});
	};

	setAccountNumber = (accountNumber: string) => {
		this.setState({
			accountNumber,
			canSubmit: false,
			success: null,
			accountName: ""
		});
	};

	setBankCode = (bankCode: string) => {
		this.setState({
			bankCode,
			canSubmit: false,
			success: null,
			accountName: "",
			accountNumber: ""
		});
	};

	verifyAccountNumber = (): void => {
		const { accountNumber, bankCode } = this.state;

		if (accountNumber && bankCode) {
			nprogress.start();
			fetch(`/api/banks/verify/${bankCode}/${accountNumber}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.then(res => {
					nprogress.done();
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
				.catch(err => {
					nprogress.done();
					this.setState({ error: err });
				});
		}
	};

	updateAccountNumber = (e: any): void => {
		e.preventDefault();
		const { accountNumber, bankCode } = this.state;

		this.context.confirmPassword(
			async (): Promise<void> => {
				if (accountNumber && bankCode) {
					nprogress.start();
					const attributes = [
						{ Name: "custom:bank_code", Value: bankCode },
						{ Name: "custom:account_number", Value: accountNumber }
					];

					try {
						await setAttributes(
							attributes,
							this.appContext.user["cognito:username"]
						);
						nprogress.done();
						this.setState({ success: true });
					} catch (err) {
						this.setState({ success: false, error: err.message });
					}
				}
			}
		);
	};

	render() {
		return (
			<AppContext.Consumer>
				{context => {
					this.appContext = context;
					return this.props.children({
						...this.state,
						setBankCode: this.setBankCode,
						setAccountNumber: this.setAccountNumber,
						verifyAccountNumber: this.verifyAccountNumber,
						updateAccountNumber: this.updateAccountNumber
					});
				}}
			</AppContext.Consumer>
		);
	}
}

export default VerifyAccountNumberContainer;
