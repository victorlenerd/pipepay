import crypto from 'crypto';
import PaymentModel from './payment.model';
import InvoiceModel from '../invoice/invoice.model';
import * as mailer from '../../modules/mailer';
import generateController from '../../modules/generateController';
import Transfer from '../../modules/transfer';

const secret = process.env.PAYSTACK_SECRET;

export default generateController(PaymentModel, {
    createOne: (req, res) => {
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
        const { event, data: { transaction: { reference }, amount, paid, invoice_code, customer: { first_name, last_name, email } } } = req.body;

        if (hash === req.headers['x-paystack-signature'] && event === 'invoice.update' && paid) {
            InvoiceModel.findOneAndUpdate({ invoice_code }, { $set :{ status: 'paid' } }, { new: true }, async (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ error: new Error(error), status: false });
                }

                const { 
                    _id,
                    type,
                    whoPaysDeliveryFee,
                    marchantName,
                    marchantEmail,
                    marchantBankCode,
                    deliveryAmount,
                    marchantAccountNumber
                } = doc;
 
                try {
                    if (type === 'good') {
                        await Transfer(marchantName, marchantAccountNumber, marchantBankCode, deliveryAmount);
                        await PaymentModel.create({ customerEmail: email, marchantEmail, reference, deliveryAmount, invoiceId: _id });
                    }

                    await mailer.sendReceiptMail(`${first_name} ${last_name}`, email, marchantEmail, amount);
                    res.status(200).send({ success: true });
                } catch (err) {
                    console.log(err);
                    return res.status(400).send({ error: { message: 'Could not send mail' }, success: false });
                }
            })
        } else {
            res.status(400).send({ success: false });
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