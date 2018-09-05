import request from 'superagent';
import express from 'express';
const secret = process.env.PAYSTACK_SECRET;
const Router = express.Router();

Router.route('/')
    .get(async (req, res) => {
        request
            .get(`https://api.paystack.co/bank`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${secret}`)
            .end((err, { body: { data } }) => {
                if (err) res.status(400).send({ success: false, err });
                res.send({ success: true, data });
            });
    });

Router.route('/verify/:bank_code/:account_number')
    .get(async (req, res) => {
        const { bank_code, account_number } = req.params;
        
        request
            .get(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${secret}`)
            .then(({ body: { data } }) => {
                res.send({ success: true, data })
            })
            .catch((err) => {
                res.status(400).send({ success: false, err });
            });
    });


export default Router;