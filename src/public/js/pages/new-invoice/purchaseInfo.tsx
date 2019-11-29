import React from "react";

type Props = {
	submit: (e: Object) => void,
	back: () => void
};

const PurchaseInfo = ({ submit, back }: Props) => {

	let categories = [];

	if (typeof window === "object") {
		// @ts-ignore: definitely exist
		categories = window.__initial_data__.categories;
	}

	return (
		<form name="purchase-form" onSubmit={submit}>
			<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
				<h3 className="section-title">Purchase Info</h3>
				<label>Select your product categories</label>
				<select
					className="text-input"
					required
					name="category"
				>
					{categories.map(category => {
						return (
							<option value={category.category} key={category._id}>
								{category.category}
							</option>
						);
					})}
				</select>
				<br />
				<br />
				<div className="alert alert-warning" role="alert">
					<strong>Disclaimer</strong> You can't sell any Land, Houses or anything that requires validation from a third party agency or governmental body.
				</div>
				<br />
				<br />
				<label htmlFor="c-email">Description</label>
				<textarea
					name="description"
					className="text-input area"
					placeholder="Tell us something about the purchased good"
					required
					autoFocus
				/>
				<div className="alert alert-info" role="alert">
					Please ensure you use a clear and straightforward description.
					This would be important for disputes resolution.
				</div>
				<br />
				<br />
				<label htmlFor="c-email">Price Of Good</label>
				<input
					type="number"
					name="purchase_amount"
					min={1000}
					placeholder="What's the total price of the item purchased"
					className="text-input"
					required
				/>
				<div className="alert alert-info" role="alert">
						Do not include commas or dots. Simple use numbers e.g 5000 or 700000
				</div>
				<br />
				<br />
				<label htmlFor="c-email">Delivery Fee</label>
				<input
					type="number"
					name="delivery_fee"
					placeholder="Delivery Price"
					className="text-input"
					min={500}
					required
				/>
				<div className="alert alert-info" role="alert">
					Do not include commas or dots. Simple use numbers e.g 5000 or 700000
				</div>
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
};

export default PurchaseInfo;
