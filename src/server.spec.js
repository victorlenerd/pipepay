import chai from "chai";
import chaiHttp from "chai-http";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import crypto from "crypto";
import app from "./server";
import { signin, userPool, dropDb, connectDb } from "./test-helpers/auth";

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
const secret = process.env.PAYSTACK_SECRET;
const mock = new MockAdapter(axios);
const expect = chai.expect;

chai.use(chaiHttp);
global.fetch = require("node-fetch-polyfill");

describe("Server Operations", () => {
	let token;
	let user;
	let emailCode = "AXYZ0000";
	let invoiceId = null;
	let invoice_code = null;
	let accessBankCode = null;
	let milestones = null;

	it("Login", async () => {
		try {
			await signin(username, password);
			const cognitoUser = userPool.getCurrentUser();
			cognitoUser.getSession((err, result) => {
				if (err) console.error(err);

				if (result && result.isValid()) {
					token = result.getIdToken().getJwtToken();
					user = result.getIdToken().payload;
				}

				expect(user).to.have.property("sub");
			});
		} catch (err) {
			throw err;
		}
	});

	xit("create invoice", done => {
		chai
			.request(app)
			.post("/api/invoice")
			.set({
				Authorization: `Bearer ${token}`
			})
			.send({
				description: "This is an invoice",
				type: "good",

				deliveryAmount: 500,
				purchaseAmount: 5000,

				customerName: "Victor Nwaokocha",
				customerEmail: "vnwaokocha@gmail.com",
				customerPhone: "09098612833",

				whoPaysPipepayFee: "seller",
				whoPaysDeliveryFee: "seller"
			})
			.end((err, res) => {
				invoice_code = res.body.data.invoice_code;
				invoiceId = res.body.data._id;
				expect(res.body.data).to.be.have.property("invoice_code");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("retrive invoice", done => {
		chai
			.request(app)
			.get("/api/invoice/" + invoiceId)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.body.data._id).to.be.equal(invoiceId);
				expect(res.body.data).to.have.property("totalPrice");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("get user invoices", done => {
		chai
			.request(app)
			.get("/api/invoice/")
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.body.data.invoices.length).to.be.greaterThan(0);
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("get payment", done => {
		chai
			.request(app)
			.get("/api/request/" + invoiceId)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.body.data.invoiceId).to.be.equal(invoiceId);
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("send customer verifcation mail", done => {
		chai
			.request(app)
			.get("/api/verify/" + invoiceId)
			.end((err, res) => {
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("do not confirm without email code", done => {
		chai
			.request(app)
			.post("/api/confirm/" + invoiceId)
			.send({
				accepted: true
			})
			.end((err, res) => {
				expect(res.body.success).to.be.equal(false);
				done();
			});
	});

	xit("confirm payment::accepted", done => {
		chai
			.request(app)
			.post("/api/confirm/" + invoiceId)
			.send({
				emailCode,
				accepted: true
			})
			.end((err, res) => {
				expect(res.body.data.status).to.be.equal("accepted");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("confirm payment::rejected", done => {
		chai
			.request(app)
			.post("/api/confirm/" + invoiceId)
			.send({
				emailCode,
				accepted: false
			})
			.end((err, res) => {
				expect(res.body.data.status).to.be.equal("rejected");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("get list of banks", done => {
		chai
			.request(app)
			.get("/api/banks/")
			.end((err, res) => {
				accessBankCode = res.body.data[0].code;
				expect(res.body.data.length).to.be.greaterThan(2);
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("confirm account number", done => {
		chai
			.request(app)
			.get(`/api/banks/verify/${accessBankCode}/0695257934`)
			.end((err, res) => {
				expect(res.body.data).to.haveOwnProperty("account_name");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("create dispute", done => {
		chai
			.request(app)
			.post(`/api/dispute/${invoiceId}`)
			.send({
				customerEmail: "nvonweb@outlook.com",
				merchantEmail: "vnwaokocha@gmail.com",
				category: "",
				from: "merchant",
				reason: "I don't want anymore"
			})
			.end((err, res) => {
				expect(res.body.data).to.haveOwnProperty("_id");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("get dispute", done => {
		chai
			.request(app)
			.get(`/api/dispute/${invoiceId}`)
			.end((err, res) => {
				expect(res.body.data.status).to.equal("open");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("delete invoice", done => {
		chai
			.request(app)
			.delete("/api/invoice/" + invoiceId)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	it("create milestone invoice", done => {
		chai
			.request(app)
			.post("/api/invoice")
			.set({
				Authorization: `Bearer ${token}`
			})
			.send({
				description: "This is an invoice",
				type: "service",

				milestones: [
					{
						name: "Design",
						amount: 30000,
						description: "Desiging",
						dueDate: new Date()
					},
					{
						name: "Development",
						amount: 30000,
						description: "Coding",
						dueDate: new Date()
					},
					{
						name: "Deployment",
						amount: 30000,
						description: "Deploying",
						dueDate: new Date()
					}
				],

				customerName: "Victor Nwaokocha",
				customerEmail: "vnwaokocha@gmail.com",
				customerPhone: "09098612833",

				whoPaysPipepayFee: "seller"
			})
			.end((err, res) => {
				invoice_code = res.body.data.invoice_code;
				invoiceId = res.body.data._id;
				milestones = res.body.data.milestones;
				expect(res.body.data).to.be.have.property("invoice_code");
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	it("create payment", done => {
		const payment = {
			event: "charge.success",
			data: {
				status: "success",
				amount: 200000,
				reference: "1234",
				metadata: {
					referrer: "https://p/p/" + invoice_code
				}
			}
		};

		const hash = crypto
			.createHmac("sha512", secret)
			.update(JSON.stringify(payment))
			.digest("hex");

		chai
			.request(app)
			.post("/api/payment")
			.set({
				"X-Paystack-Signature": hash
			})
			.send(payment)
			.end((err, res) => {
				expect(res.status).to.be.equal(200);
				done();
			});
	});

	it("request payment for good invoice", done => {
		chai
			.request(app)
			.get("/api/request/" + invoiceId + "/" + milestones[0]._id)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.status).to.be.equal(200);
				expect(res.body.success).to.be.equal(true);
				expect(res.body.data.milestones[0]._id).to.be.equal(milestones[0]._id);
				done();
			});
	});

	it("request payment for good invoice", done => {
		chai
			.request(app)
			.get("/api/request/" + invoiceId + "/" + milestones[1]._id)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.status).to.be.equal(200);
				expect(res.body.success).to.be.equal(true);
				expect(res.body.data.milestones[1]._id).to.be.equal(milestones[1]._id);
				done();
			});
	});

	it("request payment for good invoice", done => {
		chai
			.request(app)
			.get("/api/request/" + invoiceId + "/" + milestones[2]._id)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.status).to.be.equal(200);
				expect(res.body.success).to.be.equal(true);
				expect(res.body.data.milestones[2]._id).to.be.equal(milestones[2]._id);
				done();
			});
	});

	xit("request milestone payment", done => {
		chai
			.request(app)
			.get("/api/request/" + invoiceId + "/" + milestones[0]._id)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("confirm milestone payment::accepted", done => {
		chai
			.request(app)
			.post("/api/confirm/" + invoiceId + "/" + milestones[0]._id)
			.send({
				emailCode,
				accepted: true
			})
			.end((err, res) => {
				expect(res.body.data.milestones[0].paid).to.be.equal(true);
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});

	xit("delete invoice", done => {
		chai
			.request(app)
			.delete("/api/invoice/" + invoiceId)
			.set({
				Authorization: `Bearer ${token}`
			})
			.end((err, res) => {
				expect(res.body.success).to.be.equal(true);
				done();
			});
	});
});
