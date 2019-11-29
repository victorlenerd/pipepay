import React from "react";
import ReactDOM from "react-dom";
import serverStyleCleanup from 'node-style-loader/clientCleanup';
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: "https://34c300355f66498a8e7a7b21df7fadbd@sentry.io/1315245"
});

const render = Component => {
	ReactDOM.hydrate(
		<BrowserRouter>
			<Component />
		</BrowserRouter>, document.getElementById("main"));
};

if (window) {
	window.onload = () => render(App);
	serverStyleCleanup();
}

if (module.hot && process.env.NODE_ENV === "development") {
	module.hot.accept("./app", () => {
		render(require("./app").default);
	});
}
