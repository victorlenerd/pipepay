//@flow
import React from "react";

type Props = {
	submit: (e: Object) => void
};

const ChooseType = ({ submit }: Props) => (
	<form name="invoice-type" onSubmit={submit}>
		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
			<h3 className="section-title">Type Of Invoice</h3>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
					<input
						id="invoice_type_good"
						type="radio"
						name="invoice_type"
						value="good"
						required
					/>
					&nbsp;&nbsp;
					<label htmlFor="invoice_type_good">Good / Marchandise</label>
					<p>
						Shipping a something physical? Like a clothes, shoes or books, then
						select this option
					</p>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
					<input
						id="invoice_type_service"
						type="radio"
						name="invoice_type"
						value="service"
						required
					/>
					&nbsp;&nbsp;
					<label htmlFor="invoice_type_service">Service / Milestone</label>
					<p>
						Are you providing a service for someone? Do you have to split the
						payments into small parts, then select this option
					</p>
				</div>
			</div>
			<div className="clearfix" />
			<div className="form-buttons">
				<input
					name="invoice-type-submit"
					type="submit"
					value="NEXT"
					id="send"
					className="text-submit"
				/>
			</div>
		</div>
	</form>
);

export default ChooseType;
