import InvoiceModel from './invoice.model';
import * as mailer from '../../modules/mailer';
import recode from '../../modules/recode';
import generateController from '../../modules/generateController';
import { CreateInvoice } from '../../modules/invoice';

export default generateController(InvoiceModel, {
    createOne: async (req, res) => {
        var body = req.body;
        body.userId = req.user.id;
        body.marchantEmail = req.user.email;
        body.status = "sent";
        body.verifyCode = process.env.NODE_ENV === 'testing' ? 'AXYZ0000' : recode();
        body.totalPrice = (200 * 100) + (body.purchaseAmount * 100) + (body.deliveryAmount * 100) + (((body.purchaseAmount * 5) / 100) * 100);

        try {
            const { data: { request_code } }  = await CreateInvoice({ email: body.customerEmail, name: body.customerName, phone: body.customerPhone }, body.totalPrice, body.description);
            
            body.invoice_code = request_code;

            InvoiceModel.create(body, async (err, doc) => {
                if (err) return res.status(400).send({ error: { message: 'Could not create the invoice' }, success: false });
                delete doc.verifyCode;
                res.send({ data: doc, success: true });
            });
        } catch(err) {
            return res.status(400).send({ err, success: false });
        }
    }
});