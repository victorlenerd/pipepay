//@flow
import React from "react";

type Props = {
	submit: (e: Object) => void,
	back: () => void
};

const PurchaseInfo = ({ submit, back }: Props) => (
	<form name="purchase-form" onSubmit={submit}>
		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
			<h3 className="section-title">Purchase Info</h3>
			<br />
			<label htmlFor="c-email">Description</label>
			<textarea
				name="description"
				className="text-input area"
				placeholder="Tell us something about the purchased good"
				required
				autoFocus
			/>
			<br />
			<br />
			<label htmlFor="c-email">Price Of Good</label>
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
		</div>
	</form>
);

export default PurchaseInfo;
