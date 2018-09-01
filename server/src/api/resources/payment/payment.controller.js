import crypto from 'crypto';
import PaymentModel from './payment.model';
import InvoiceModel from '../invoice/invoice.model';
import * as mailer from '../../modules/mailer';
import generateController from '../../modules/generateController';

const secret = process.env.PAYSTACK_SECRET;

export default generateController(PaymentModel, {
    createOne: (req, res) => {
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
        const { event, data: { reference, amount, customer: { first_name, last_name, email, metadata: { marchantEmail, invoiceId } } } } = req.body;

        if (hash === req.headers['x-paystack-signature'] && event === 'charge.success') {
            PaymentModel.create({ customerEmail: email, marchantEmail, reference, amount, invoiceId }, (err) => {
                if (err) return res.status(500).send({ error: new Error(error), status: false });
                
                InvoiceModel.updateOne({ _id: invoiceId }, { status: 'paid' }, async (err) => {
                    if (err) return res.status(500).send({ error: new Error(error), status: false });
                    try {
                        await mailer.sendReceiptMail(`${first_name} ${last_name}`, email, marchantEmail, amount);
                        res.status(200).send({ success: true });
                    } catch (err) {
                        return res.status(500).send({ error: { message: 'Could not send mail' }, success: false });
                    }
                })
            });
        } else {
            res.status(500).send({ success: false });
        }
    },
    getOne: (req, res) => {
        var id = req.params.invoiceId;
        PaymentModel.findOne({ invoiceId: id }, function (err, doc) {
            if (err) res.status(401).send({ success: false, error: { ...err } });
            res.status(200).send({ success: true, data: doc });
        });
    }
});