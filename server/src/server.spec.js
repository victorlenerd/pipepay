import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import crypto from 'crypto';
import app from './server';
import { signin, userPool, dropDb } from './test-helpers/auth';

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
const secret = process.env.PAYSTACK_SECRET;
const mock = new MockAdapter(axios);
const expect = chai.expect;

chai.use(chaiHttp);
global.fetch = require('node-fetch-polyfill');

dropDb();

describe('Server Operations', () => {
    
    let token;
    let user;
    let paystackRef = '1234567890';
    let emailCode = 'AXYZ0000';
    let invoiceId = null;
    let accessBankCode = null;

    it('Login', async () => {
        try {
            await signin(username, password);
            const cognitoUser = userPool.getCurrentUser();    
            cognitoUser.getSession((err, result) => {
                if (err) console.error(err);

                if (result && result.isValid()) {
                    token = result.getIdToken().getJwtToken();
                    user = result.getIdToken().payload;
                }

                expect(user).to.have.property('sub');
            });
        } catch (err) {
            throw err;
        }
    });


    it('create invoice', (done) => {
        chai.request(app)
        .post('/api/invoice')
        .set({
            'Authorization': `Bearer ${token}`
        })
        .send({
            description: "This is an invoice",
            deliveryAmount: 500,
            purchaseAmount: 5000,
            customerName: 'Victor Nwaokocha',
            customerEmail: 'vnwaokocha@gmail.com'
        })
        .end((err, res) => {
            invoiceId = res.body.data._id;
            expect(res.body.data).to.be.have.property('_id');
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });


    it('retrive invoice', (done) => {
        chai.request(app)
        .get('/api/invoice/'+invoiceId)
        .end((err, res) => {
            expect(res.body.data._id).to.be.equal(invoiceId);
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('create payment', (done) => {
        const payment = {
            event: 'charge.success',
            data: {
                reference: '',
                amount: 200000,
                customer: { 
                    first_name: 'Victor',
                    last_name: 'Nwaokocha',
                    email: 'nvonweb@outlook.com',
                    metadata: {
                        invoiceId,
                        marchantEmail : 'vnwaokocha@gmail.com'
                    }
                } 
            }
        };
        
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(payment)).digest('hex');

        chai.request(app)
        .post('/api/payment')
        .set({
            'X-Paystack-Signature': hash
        })
        .send(payment)
        .end((err, res) => {
            expect(res.status).to.be.equal(200);
            done();
        });

    });

    it('get payment', (done) => {
        chai.request(app)
        .get('/api/payment/'+invoiceId)
        .end((err, res) => {
            expect(res.body.data.invoiceId).to.be.equal(invoiceId);
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('send customer verifcation mail', (done) => {
        chai.request(app)
        .get('/api/verify/'+invoiceId)
        .end((err, res) => {
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('do not confirm without email code', (done) => {
        chai.request(app)
        .post('/api/confirm/'+invoiceId)
        .send({
            accepted: true
        })
        .end((err, res) => {
            expect(res.body.success).to.be.equal(false);
            done();
        });
    });

    it('confirm payment::accepted', (done) => {
        chai.request(app)
        .post('/api/confirm/'+invoiceId)
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

    it('confirm payment::rejected', (done) => {
        chai.request(app)
        .post('/api/confirm/'+invoiceId)
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

    it('get list of banks', (done) => {
        chai.request(app)
        .get('/api/banks/')
        .end((err, res) => {
            accessBankCode = res.body.data[0].code;
            expect(res.body.data.length).to.be.greaterThan(2);
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('confirm account number', (done) => {
        chai.request(app)
        .get(`/api/banks/verify/${accessBankCode}/0695257934`)
        .end((err, res) => {
            expect(res.body.data).to.haveOwnProperty('account_name');
            expect(res.body.success).to.be.equal(true);
            done();
        });
    })
    
    it('create dispute', (done) => {
        chai.request(app)
        .post(`/api/dispute/${invoiceId}`)
        .send({
            customerEmail: 'nvonweb@outlook.com',
            marchantEmail: 'vnwaokocha@gmail.com',
            category: '',
            reason: 'I don\'t want anymore'
        })
        .end((err, res) => {
            expect(res.body.data).to.haveOwnProperty('_id');
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('get dispute', (done) => {
        chai.request(app)
        .get(`/api/dispute/${invoiceId}`)
        .end((err, res) => {
            expect(res.body.data.status).to.equal('open');
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('delete invoice', (done) => {
        chai.request(app)
        .delete('/api/invoice/'+invoiceId)
        .set({
            'Authorization': `Bearer ${token}`
        })
        .end((err, res) => {
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });
});