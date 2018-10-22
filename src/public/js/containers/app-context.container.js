//@flow
import React from "react";
import AppContext from "../contexts/app.context";

const WithContext = Comp => (
	<AppContext>
		{values => (
			<React.Fragment>
				<Comp {...values} />
			</React.Fragment>
		)}
	</AppContext>
);

export default WithContext;
