import React from "react";
import Header from "../components/header";

import AppContext from "../contexts/app.context";

const WithHeader = Comp => (
	<AppContext.Consumer>
		{values => {
			return (
				<React.Fragment>
					<Header {...values} />
					<Comp {...values} />
				</React.Fragment>
			)
		}}
	</AppContext.Consumer>
);

export default WithHeader;
