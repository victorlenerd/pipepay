import mongoose from "mongoose";
import appConfig from "./config";

mongoose.Promise = global.Promise;

// mongodb+srv://admin:<password>@pipepay-dev-hzjwa.mongodb.net/test?retryWrites=true&w=majority

export const connect = (config = appConfig) => {
	return mongoose.connect(
		config.db.url,
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true
		}
	);
};
