//@flow
import React from "react";

type Props = {
	submit: (e: Object) => void,
	back: () => void
};

const PurchaseInfo = ({ submit, back }: Props) => (
	<form name="purchase-form" onSubmit={submit}>
		<h4 className="section-title">Purchase Info</h4>
		<br />
		<label htmlFor="c-email">Description</label>
		<textarea
			name="description"
			className="text-input area"
			placeholder="Tell us something about the purchased good"
			required
		/>
		<br />
		<br />
		<label htmlFor="c-email">Purchase Amount</label>
		<input
			type="number"
			name="purchase_amount"
			placeholder="What's the total price of the item purchased"
			className="text-input"
			required
		/>
		<br />
		<br />
		<label htmlFor="c-email">Delivery Fee</label>
		<input
			type="number"
			name="delivery_fee"
			placeholder="Delivery Price"
			className="text-input"
			required
		/>
		<br />
		<br />
		<div className="clearfix" />
		<div className="form-buttons">
			<input
				name="back-button"
				type="button"
				value="BACK"
				className="text-submit-inverse"
				onClick={back}
			/>
			<input
				name="invoice-type-purchase"
				type="submit"
				value="NEXT"
				id="send"
				className="text-submit"
			/>
		</div>
	</form>
);

export default PurchaseInfo;
