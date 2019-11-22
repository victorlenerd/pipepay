import React from "react";
import { abbreviate_number } from "../../helpers";

interface IProps {
	sellerInfo: { balance: number } | null
}

const Withdraw = (props: IProps) => {
	const {sellerInfo} = props;

	if (!Boolean(sellerInfo)) {
		return null;
	}

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
			<input
				disabled={sellerInfo.balance < 1}
				type="button"
				value="Withdraw Balance"
				className={"text-submit"}
			/>
		</div>
	);
};

export default Withdraw;
