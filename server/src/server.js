import express from "express";
import path from "path";
import setupMiddleware from "./middleware";
import MainRouter from "./api/resources";
import { connect } from "./db";
import { getJWT } from "./api/modules/auth";
import { StaticRouter, Switch, Route } from "react-router-dom";
import exphbs from "express-handlebars";


import React from "react";
import ReactDOMServer from "react-dom/server";

import Home from "./public/js/pages/home";

const app = express();

getJWT();
setupMiddleware(app);

const App = () => (
	<Switch>
		<Route path="/" component={Home} />
	</Switch>
);

app.set("views", path.join(__dirname, "views"));

app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir:"src/views/layouts/"}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
	next();
});

connect().catch((err) => {
	console.error("DB error", err);
});

app.get("/*", (req, res) => {
	const context = {};
    
	const appString = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);

	res.render("index", { appString });
});

app.use("/api", MainRouter);

export default app;