import PaymentModel from './payment.model';
import InvoiceModel from '../invoice/invoice.model';

import * as mailer from '../../modules/mailer';
import generateController from '../../modules/generateController';

export default generateController(InvoiceModel, {
    createOne: (req, res) => {
        var body = req.body;
        body.userId = req.user.id;
        
        //TODO: Verify request is from paystack
        //TODO: Get marchant email

        const marchantEmail = null;

        PaymentModel.create(body, async (err, doc) => {
            if (err) return res.status(500).send({ error: { message: 'Could not create the payment' }, status: false });

            try {
                await mailer.sendReceiptMail(doc, marchantEmail);
            } catch (err) {
                return res.status(500).send({ error: { message: 'Could not send mail' }, status: false });
            }
            res.send({ data: doc, status: true });
        });
    }
});