import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './server';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Server Operations', () => {

    it('get request', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            expect(res.text).to.be.equal('Hello, World!');
            done();
        });
    });

});