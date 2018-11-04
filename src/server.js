import express from "express";
import path from "path";
import setupMiddleware from "./middleware";
import MainRouter from "./api/resources";
import { connect } from "./db";
import { getJWT } from "./api/modules/auth";
import exphbs from "express-handlebars";

const app = express();

getJWT();
setupMiddleware(app);

app.set("views", path.join(__dirname, "views"));

app.engine(
	"handlebars",
	exphbs({ defaultLayout: "main", layoutsDir: "src/views/layouts/" })
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Authorization, Content-Type, Accept"
	);
	next();
});

connect().catch(err => {
	console.error("DB error", err);
});

app.get(
	"(/|/invoices|/invoice/:invoiceId|/sigin|/signup|/forgotpassword|/verifyaccn|/newinvoice|/settings|/request/:invoice|/request/:invoice/:milestoneId|/confirm/:token|/reason|/pricing|/report)",
	(req, res) => {
		res.render("index");
	}
);

app.use("/api", MainRouter);

export default app;
