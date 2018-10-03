//@flow
import React from "react";

type Props = {
    updateStage: () => void,
    submit: () => void,
    type: string
}

const CustomerInfo = ({ type, submit, updateStage }: Props) => (
	<form name="costomer-form" onSubmit={submit}>
		<h4 className="section-title">Customer Info</h4>
		<br />
		<label htmlFor="c-name">Customer Name</label>
		<input
			type="text"
			name="customer_name"
			placeholder="Customer Name"
			id="c-name"
			className="text-input"
			required
		/>
		<br />
		<br />
		<label htmlFor="c-phone">Customer Phone</label>
		<input
			type="text"
			name="customer_phone"
			placeholder="Customer Phone Number"
			id="c-phone"
			className="text-input"
			required
		/>
		<br />
		<br />
		<label htmlFor="c-email">Customer Email</label>
		<input
			type="text"
			name="customer_email"
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
					type === "goods"
						? () => updateStage(4)
						: () => updateStage(0)
				}
			/>
			<input
				type="submit"
				value={type === "goods" ? "DONE" : "NEXT"}
				id="send"
				className="text-submit"
			/>
		</div>
	</form>
);
    
export default CustomerInfo;