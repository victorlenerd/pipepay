import bodyParser from "body-parser";
import morgan from "morgan";

const setGlobalMiddleware = app => {
	app.use(morgan());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
};

export default setGlobalMiddleware;
