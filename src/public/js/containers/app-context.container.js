import React from "react";
import AppContext from "../contexts/app.context";

const WithContext = Comp => (
	<AppContext.Consumer>
		{values => (
			<React.Fragment>
				<Comp {...values} />
			</React.Fragment>
		)}
	</AppContext.Consumer>
);

export default WithContext;
