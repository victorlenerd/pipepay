import React from "react";
import { abbreviate_number } from "../../helpers";
import { withAppContext, IWithAppContext } from "../../contexts/app.context";
import NProgress from "nprogress";

const Withdraw = (props: IWithAppContext) => {
	const { appContext: { user, setCurrentUser } } = props;
	const { sellerInfo, token } = user;

	if (!Boolean(sellerInfo)) {
		return null;
	}

	const [state, setState] = React.useState({
		sent: null,
		error: null
	});

	const { sent, error } = state;

	const requestWithdraw = React.useCallback(async () => {

		NProgress.start();

		try {
			const { status, error } = await fetch("/api/withdraw", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			}).then(res => res.json());

			NProgress.done();

			if (status) {
				setCurrentUser({ ...user, sellerInfo: { ...sellerInfo, balance: 0 } });
				setState((state) => ({ ...state, sent: true }));
			} else {
				setState((state) => ({ ...state, sent: false, error }));
			}
		} catch(err) {
			setState((state) => ({ ...state, sent: false, error: "failed to send withdraw request" }));
		}
	}, []);

	return (
		<div className="text-center">
			<p style={{ fontSize: '0.9em', color: 'rgba(0,0,0, 0.4)' }}>
				Your balance will be transferred <br />
				to your account in less than 24 hours <br />
				when you make a withdraw.
			</p>
			<br />
			<h1 className="pending-transactions-amount">
				&#x20A6;{abbreviate_number(sellerInfo.balance)}
			</h1>
			<br />
			{(typeof sent === 'boolean' && sent) && <p className="success-text">Withdraw request has been sent. Expect to receive your funds in less than 24hrs</p>}
			{(typeof sent === 'boolean' && !sent) && <p className="form-error">{error}</p>}
			<input
				disabled={sellerInfo.balance < 1}
				type="button"
				onClick={requestWithdraw}
				value="Withdraw Balance"
				className={"text-submit"}
			/>
		</div>
	);
};

export default withAppContext(Withdraw) ;
