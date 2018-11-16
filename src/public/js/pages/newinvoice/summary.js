//@flow
import React from "react";

type Props = {
	type: string,
	customerInfo: {
		customerEmail: string,
		customerPhone: string,
		customerName: string
	},
	submit: () => void,
	back: () => void,
	data: {}
};

const Summary = ({ type, data, customerInfo, back, submit }: Props) => (
	<React.Fragment>
		<h2 className="section-title">Summary</h2>

		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<h3>Customer Info</h3>
				<br />
				<div>
					<label>Name:</label>
					<h4>{customerInfo.customerName}</h4>
				</div>
				<div>
					<label>Email:</label>
					<h4>{customerInfo.customerEmail}</h4>
				</div>
				<div>
					<label>Phone:</label>
					<h4>{customerInfo.customerPhone}</h4>
				</div>
			</div>
			{type === "good" ? (
				<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					<h3>Purchase Info</h3>
					<br />
					<div>
						<label>Price Of Good:</label>
						<h4>{data.purchase_amount}</h4>
					</div>
					<div>
						<label>Delivery Fee:</label>
						<h4>{data.delivery_fee}</h4>
					</div>
					<div>
						<label>Who Pays Delivery Fee</label>
						<h4>{data.whoPaysDeliveryFee}</h4>
					</div>
					<div>
						<label>Who Pays PipePay Fee</label>
						<h4>{data.whoPaysPipepayFee}</h4>
					</div>
				</div>
			) : (
				<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					<h2>Milestones</h2>
					<br />
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
							<label>Amount</label>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
							<label>Description</label>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
							<label>Due Date</label>
						</div>
					</div>
					<br />
					{data.milestones.map(({ amount, description, dueDate }, i) => (
						<div
							key={i}
							className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border-line-bottom"
						>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
								{amount}
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
								{description}
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
								{dueDate}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
		<div className="clearfix" />
		<br />
		<br />
		<div className="form-buttons">
			<input
				name="back-button"
				type="button"
				value="BACK"
				className="text-submit-inverse"
				onClick={back}
			/>
			<input
				onClick={submit}
				type="submit"
				value="SEND"
				id="send"
				className="text-submit"
			/>
		</div>
	</React.Fragment>
);

export default Summary;
