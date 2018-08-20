import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './server';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Server Operations', () => {
    
    let invoiceId = null;

    it('create invoice', (done) => {
        chai.request(app)
        .post('/invoice')
        .send({
            description: "This is an invoice",
            deliveryAmount: 500,
            purchaseAmount: 5000,
            customerEmail: 'vnwaokocha@gmail.com'
        })
        .end((err, res) => {
            invoiceId = res.body.data._id;
            expect(res.body.data).to.be.have.property('_id');
            expect(res.body.status).to.be.equal(true);
            done();
        });
    });


    it('retrive invoice', (done) => {
        chai.request(app)
        .get('/invoice/'+invoiceId)
        .end((err, res) => {
            expect(res.body.data._id).to.be.equal(invoiceId);
            expect(res.body.status).to.be.equal(true);
            done();
        });
    });

    it('delete invoice', (done) => {
        chai.request(app)
        .delete('/invoice/'+invoiceId)
        .end((err, res) => {
            expect(res.body.status).to.be.equal(true);
            done();
        });
    });

});