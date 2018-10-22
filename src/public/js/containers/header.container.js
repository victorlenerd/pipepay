//@flow
import React from "react";
import Header from "../components/header";

import AppContext from "../contexts/app.context";

const WithHeader = Comp => (
	<AppContext>
		{values => (
			<React.Fragment>
				<Header {...values} />
				<Comp {...values} />
			</React.Fragment>
		)}
	</AppContext>
);

export default WithHeader;
