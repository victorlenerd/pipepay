//@flow
import React from "react";
import Header from "../components/header";

type Props = { title: string, children?: React.Node };

const BannerForm = ({ title, children }: Props) => (
	<React.Fragment>
		<Header />
		<div
			className="col-lg-6 col-md-6 col-sm-12 col-xs-12 cloths-bg hidden-sm hidden-xs"
			id="noPad"
		>
			<div className="overlay" />
		</div>
		<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-from-content">
			<div className="container-main">
				<div className="header">
					<h1>{title}.</h1>
				</div>
				<br />
				<br />
				{children}
			</div>
		</div>
	</React.Fragment>
);

export default BannerForm;
