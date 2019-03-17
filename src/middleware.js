import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

const setGlobalMiddleware = app => {
	app.use(helmet());
	app.use(morgan());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
};

export default setGlobalMiddleware;
