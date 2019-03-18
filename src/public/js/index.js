import React from "react";
import ReactDOM from "react-dom";

import App from "./app";
import { AppContainer } from "react-hot-loader";

import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: "https://34c300355f66498a8e7a7b21df7fadbd@sentry.io/1315245"
});

const render = Component => {
	ReactDOM.render(<App />, document.getElementById("main"));
};

window.onload = render;

if (module.hot) {
	module.hot.accept("./app", () => {
		const NewApp = render(require("./app")).default;
		ReactDOM.render(<NewApp />, document.getElementById("main"));
	});
}
