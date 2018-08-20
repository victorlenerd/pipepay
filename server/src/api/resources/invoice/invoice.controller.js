import InvoiceModel from './invoice.model';
import * as mailer from '../../modules/mailer';
import generateController from '../../modules/generateController';

export default generateController(InvoiceModel, {
    createOne: (req, res) => {
        var body = req.body;
        body.userId = req.user.id;
        InvoiceModel.create(body, async (err, doc) => {
            if (err) return res.status(500).send({ error: { message: 'Could not create the invoice' }, status: false });

            try {
                await mailer.sendInvoiceMail(doc);
            } catch (err) {
                return res.status(500).send({ error: { message: 'Could not send mail' }, status: false });
            }
            res.send({ data: doc, status: true });
        });
    }
});