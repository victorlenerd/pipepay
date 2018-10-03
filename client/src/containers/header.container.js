//@flow
import React from "react";
import Header from "components/header";

const WithHeader = Comp => (
	<React.Fragment>
		<Header />
		<Comp />
	</React.Fragment>
);

export default WithHeader;