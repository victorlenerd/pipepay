import mongoose from "mongoose";
import appConfig from "./config";

mongoose.Promise = global.Promise;

export const connect = (config = appConfig) => mongoose.connect(
	config.db.url,
	{ 
  		useCreateIndex: true,
		useNewUrlParser: true 
	}
);
