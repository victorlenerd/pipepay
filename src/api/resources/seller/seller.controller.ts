import SellerModel from "./seller.model";
import generateController from "../../modules/generateController";
const Sentry = require("@sentry/node");

export default generateController(SellerModel, {
	createOne: async (req, res) => {
		const {
			address = null,
			facebook_username  =  null,
			instagram_username = null,
			twitter_username = null,
			website_url = null
		} = req.body;

		const usernames = [facebook_username, instagram_username, website_url, twitter_username];
		const validusernames = usernames.some((username) => Boolean(username));

		if (!validusernames) {
			return res.status(400)
				.send({
					status: false,
					error: "provide at least one username"
				});
		}

		if (!Boolean(address)) {
			return res.status(400)
				.send({
					status: false,
					error: "address is required"
				});
		}

		const userId = req.user.sub;

		try {
			const sellerInfo = await SellerModel.create({ userId, address, facebook_username, instagram_username, twitter_username, website_url });
			res.status(201).send({ status: true, sellerInfo });
			// TODO: Queue crawler to get users product.
		} catch (e) {
			Sentry.captureException(e);
			return res.status(500).send({ error: e.message, status: false });
		}
	},
	getOne: async (req, res) => {
		const { user_id = null } = req.params;

		if (!Boolean(user_id)) {
			return res.status(400).send({ error: "user id is required", status: false });
		}

		try {
			const sellerInfo = await SellerModel.findOne({ userId: user_id });
			return res.status(200).send({ sellerInfo, status: true });
		} catch (e) {
			Sentry.captureException(e);
			return res.status(500).send({ error: e.message, status: false });
		}
	},

	deleteOne: async (req, res) => {
		const { user_id = null } = req.params;

		if (!Boolean(user_id)) {
			return res.status(400).send({ error: "user id is required", status: false });
		}

		try {
			await SellerModel.findOneAndDelete({ userId: user_id });
			return res.status(200).send({  status: true });
		} catch (e) {
			Sentry.captureException(e);
			return res.status(500).send({ error: e.message, status: false });
		}
	},

	updateOne: async (req, res) => {
		const { user_id = null } = req.params;

		const {
			address = null,
			facebook_username  =  null,
			instagram_username = null,
			twitter_username = null,
			website_url = null
		} = req.body;

		const usernames = [facebook_username, instagram_username, website_url, twitter_username];
		const validusernames = usernames.some((username) => Boolean(username));

		if (!validusernames) {
			return res.status(400)
				.send({
					status: false,
					error: "provide at least one username"
				});
		}

		if (!Boolean(address)) {
			return res.status(400)
				.send({
					status: false,
					error: "address is required"
				});
		}

		if (!Boolean(user_id)) {
			return res.status(400).send({ error: "user id is required", status: false });
		}

		try {
			await SellerModel.findOneAndUpdate({ userId: user_id }, {
				address, facebook_username, instagram_username, twitter_username, website_url
			});
			return res.status(200).send({  status: true });
		} catch (e) {
			Sentry.captureException(e);
			return res.status(500).send({ error: e.message, status: false });
		}
	}
});
