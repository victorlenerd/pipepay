import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import app from './server';
import { signin, userPool } from './test-helpers/auth';

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

const mock = new MockAdapter(axios);
const expect = chai.expect;

chai.use(chaiHttp);
global.fetch = require('node-fetch-polyfill');

describe('Server Operations', () => {
    
    let token;
    let user;
    let paystackRef = '1234567890';
    let invoiceId = null;

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
        .post('/invoice')
        .set({
            'Authorization': `Bearer ${token}`
        })
        .send({
            description: "This is an invoice",
            deliveryAmount: 500,
            purchaseAmount: 5000,
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
        .get('/invoice/'+invoiceId)
        .end((err, res) => {
            expect(res.body.data._id).to.be.equal(invoiceId);
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    it('delete invoice', (done) => {
        chai.request(app)
        .delete('/invoice/'+invoiceId)
        .set({
            'Authorization': `Bearer ${token}`
        })
        .end((err, res) => {
            expect(res.body.success).to.be.equal(true);
            done();
        });
    });

    xit('create payment', (done) => {

    });

    xit('get payment', (done) => {

    });

    xit('confirm payment', (done) => {

    });

    xit('create dispute', (done) => {

    });

    xit('get dispute', (done) => {

    });

    xit('close dispute', (done) => {

    });

    xit('create transfer', (done) => {

    });

    xit('get transfer', (done) => {

    });

});