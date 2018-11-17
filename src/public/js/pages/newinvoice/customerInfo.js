//@flow
import React from "react";

type Props = {
	updateStage: (stage: number) => void,
	submit: () => void,
	type: string
};

const CustomerInfo = ({ type, submit, updateStage }: Props) => (
	<form name="costomer-form" onSubmit={submit}>
		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
			<h3 className="section-title">Customer Info</h3>
			<br />
			<label htmlFor="c-name">Customer Name</label>
			<input
				type="text"
				name="customerName"
				placeholder="Customer Name"
				id="c-name"
				className="text-input"
				required
				autoFocus
			/>
			<br />
			<br />
			<label htmlFor="c-phone">Customer Phone</label>
			<input
				type="text"
				name="customerPhone"
				placeholder="Customer Phone Number"
				id="c-phone"
				className="text-input"
				required
			/>
			<br />
			<br />
			<label htmlFor="c-email">Customer Email</label>
			<input
				type="email"
				name="customerEmail"
				placeholder="Customer Email"
				id="c-email"
				className="text-input"
				required
			/>
			<div className="clearfix" />
			<div className="form-buttons">
				<input
					name="back-button"
					type="button"
					value="BACK"
					className="text-submit-inverse"
					onClick={
						type === "goods" ? () => updateStage(4) : () => updateStage(0)
					}
				/>
				<input
					type="submit"
					value={type === "goods" ? "DONE" : "NEXT"}
					id="send"
					className="text-submit"
				/>
			</div>
		</div>
	</form>
);

export default CustomerInfo;
