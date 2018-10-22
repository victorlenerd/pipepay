//@flow
import React from "react";

type Props = {
	status: boolean,
	back: () => void
};

const Status = ({ status, back }: Props) => (
	<React.Fragment>
		<h3
			className="text-center"
			style={{ color: status ? "#61C89E" : "#D06079" }}
		>
			{status ? "Successful" : "Failed"}
		</h3>
		{status ? (
			<div id="status">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 130.2 130.2"
				>
					<circle
						className="path circle"
						fill="none"
						stroke="#61C89E"
						strokeWidth="6"
						strokeMiterlimit="10"
						cx="65.1"
						cy="65.1"
						r="62.1"
					/>
					<polyline
						className="path check"
						fill="none"
						stroke="#61C89E"
						strokeWidth="6"
						strokeLinecap="round"
						strokeMiterlimit="10"
						points="100.2,40.2 51.5,88.8 29.8,67.5 "
					/>
				</svg>
			</div>
		) : (
			<div id="status">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 130.2 130.2"
				>
					<circle
						className="path circle"
						fill="none"
						stroke="#D06079"
						strokeWidth="6"
						strokeMiterlimit="10"
						cx="65.1"
						cy="65.1"
						r="62.1"
					/>
					<line
						className="path line"
						fill="none"
						stroke="#D06079"
						strokeWidth="6"
						strokeLinecap="round"
						strokeMiterlimit="10"
						x1="34.4"
						y1="37.9"
						x2="95.8"
						y2="92.3"
					/>
					<line
						className="path line"
						fill="none"
						stroke="#D06079"
						strokeWidth="6"
						strokeLinecap="round"
						strokeMiterlimit="10"
						x1="95.8"
						y1="38"
						x2="34.4"
						y2="92.2"
					/>
				</svg>
			</div>
		)}
		<div className="form-buttons">
			<input
				name="invoice-type-purchase"
				type="submit"
				onClick={back}
				value="Back To Invoices"
				id="back_to_invoices"
				className="text-submit"
			/>
		</div>
	</React.Fragment>
);

export default Status;
