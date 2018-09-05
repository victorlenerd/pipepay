import InvoiceModel from './invoice.model';
import * as mailer from '../../modules/mailer';
import recode from '../../modules/recode';
import generateController from '../../modules/generateController';


export default generateController(InvoiceModel, {
    createOne: (req, res) => {
        var body = req.body;
        body.userId = req.user.id;
        body.marchantEmail = req.user.email;
        body.status = "sent";
        body.verifyCode = process.env.NODE_ENV === 'testing' ? 'AXYZ0000' : recode();
        
        InvoiceModel.create(body, async (err, doc) => {
            if (err) return res.status(500).send({ error: { message: 'Could not create the invoice' }, success: false });

            try {
                delete doc.verifyCode;
                await mailer.sendInvoiceMail(doc);
            } catch (err) {
                return res.status(500).send({ error: { message: 'Could not send mail' }, success: false });
            }
            
            res.send({ data: doc, success: true });
        });
    }
});