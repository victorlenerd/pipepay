import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: "https://34c300355f66498a8e7a7b21df7fadbd@sentry.io/1315245"
});

window.onload = () =>
	ReactDOM.hydrate(<App />, document.getElementById("main"));
