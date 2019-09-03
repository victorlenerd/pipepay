//@flow
import React from "react";

type Props = {
	type: string,
	submit: (e: Object) => void,
	back: () => void
};

const WhoPaysFee = ({ submit, back }: Props) => {
	let refs = {};

	const formType = type => (
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<h3 className="section-title">Who Pays {type} Fee</h3>
			<div
				className="col-lg-12 col-md-12 col-sm-12 col-xs-12 card-box"
				onClick={() =>
					refs[`who_pays_${type.toLowerCase()}_fee_customer`].click()
				}
			>
				<input
					ref={e => (refs[`who_pays_${type.toLowerCase()}_fee_customer`] = e)}
					id={`who_pays_${type.toLowerCase()}_fee_customer`}
					type="radio"
					name={`who_pays_${type.toLowerCase()}_fee`}
					value="buyer"
					required
				/>
				&nbsp;&nbsp;
				<label htmlFor={`who_pays_${type.toLowerCase()}_fee_customer`}>
					Buyer
				</label>
				<p>
					The {type} fee would be paid by the customer alone. The {type} fee
					would be added to the invoice sent to the customer
				</p>
			</div>
			<div
				className="col-lg-12 col-md-12 col-sm-12 col-xs-12 card-box"
				onClick={() => refs[`who_pays_${type.toLowerCase()}_fee_both`].click()}
			>
				<input
					ref={e => (refs[`who_pays_${type.toLowerCase()}_fee_both`] = e)}
					id={`who_pays_${type.toLowerCase()}_fee_both`}
					type="radio"
					name={`who_pays_${type.toLowerCase()}_fee`}
					value="both"
					required
				/>
				&nbsp;&nbsp;
				<label htmlFor={`who_pays_${type.toLowerCase()}_fee_both`}>
					Both (50 / 50)
				</label>
				<p>
					The {type} fee would be split between the marchant and buyer. The
					buyer pays half and the marchant pays the other half
				</p>
			</div>
			<div
				className="col-lg-12 col-md-12 col-sm-12 col-xs-12 card-box"
				onClick={() =>
					refs[`who_pays_${type.toLowerCase()}_fee_marchant`].click()
				}
			>
				<input
					ref={e => (refs[`who_pays_${type.toLowerCase()}_fee_marchant`] = e)}
					id={`who_pays_${type.toLowerCase()}_fee_marchant`}
					type="radio"
					name={`who_pays_${type.toLowerCase()}_fee`}
					value="seller"
					required
				/>
				&nbsp;&nbsp;
				<label htmlFor={`who_pays_${type.toLowerCase()}_fee_marchant`}>
					Marchant
				</label>
				<p>
					As the marchant the {type} fee would be deducted from the purchase
					amount.
				</p>
			</div>
		</div>
	);

	return (
		<form name={"who-pays-fee"} onSubmit={submit}>
			<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
				{formType("Delivery")}
				<br />
				<br />
				{formType("PipePay")}
				<div className="clearfix" />
				<div className="form-buttons">
					{/*<input
						name="back-button"
						type="button"
						value="BACK"
						className="text-submit-inverse"
						onClick={back}
					/>*/}
					<input
						name={"invoice-type-pays-fee"}
						type="submit"
						value="NEXT"
						id="send"
						className="text-submit"
					/>
				</div>
			</div>
		</form>
	);
};

export default WhoPaysFee;
