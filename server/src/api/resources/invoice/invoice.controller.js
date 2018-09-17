import InvoiceModel from './invoice.model';
import recode from '../../modules/recode';
import generateController from '../../modules/generateController';
import { CreateInvoice } from '../../modules/invoice';

export default generateController(InvoiceModel, {
    createOne: async (req, res) => {
        var body = req.body;

        body.userId = req.user.sub;        
        body.marchantEmail = req.user.email;
        body.marchantName = req.user.name;
        body.marchantAccountNumber = req.user['custom:account_number'];
        body.marchantBankCode =  req.user['custom:bank_code'];

        body.verifyCode = process.env.NODE_ENV === 'testing' ? 'AXYZ0000' : recode();

        if (body.type === 'good') {            
            body.bankCharges = 100;
            body.pipePayFee = Math.min(((body.purchaseAmount * 5) / 100),  5000) + body.bankCharges;
            body.totalPrice = body.purchaseAmount + body.deliveryAmount + body.pipePayFee;
        } else {
            body.bankCharges = ((body.milestones.length * 50));
            body.purchaseAmount = body.milestones.reduce((pv, { amount }) => { return amount + pv }, 0);
            body.purchaseAmount
            body.pipePayFee = Math.min(((body.purchaseAmount * 5) / 100),  5000) + body.bankCharges;
            body.deliveryAmount = 0;
            body.totalPrice =  body.purchaseAmount + body.pipePayFee ;
        }

        let line_items = [];

        let customerTotalAmount = body.purchaseAmount;
        let customerDeliveryFee = 0;
        let customPipepayFee = 0;

        const reconciliator = (who, original, fee) => {
            if (who === 'both') {
                return original += (fee / 2);
            } else if (who === 'buyer') {
                return original += fee;
            } else {
                return original;
            }
        }

        customerDeliveryFee = reconciliator(body.whoPaysDeliveryFee, customerDeliveryFee, body.deliveryAmount);
        customPipepayFee = reconciliator(body.whoPaysPipepayFee, customPipepayFee, body.pipePayFee);

        if (body.type === 'good') {
            line_items = [{ 'name': 'Purchase Price', 'amount': customerTotalAmount * 100 }];

            if (customPipepayFee > 0) line_items.push({ 'name': 'PipePay Fee', 'amount': customPipepayFee * 100 });
            if (customerDeliveryFee > 0) line_items.push({ 'name': 'Delivery Fee', 'amount': customerDeliveryFee * 100 });
        } else  {
            line_items = body.milestones.map(({ name, amount }) => ({ name, amount: amount * 100 }));
            line_items.push({ 'name': 'PipePay Fee', 'amount':  body.pipePayFee * 100 });
        }

        try {
            const { data: { request_code } } = await CreateInvoice({ email: body.customerEmail, name: body.customerName, phone: body.customerPhone }, customerTotalAmount * 100, body.description, line_items);
            
            body.invoice_code = request_code;

            InvoiceModel.create(body, async (err, doc) => {
                if (err) return res.status(400).send({ error: { message: 'Could not create the invoice' }, success: false });
                delete doc.verifyCode;
                doc.status = "sent";
                doc.save();
                res.send({ data: doc, success: true });
            });
        } catch(err) {
            console.log('err', err);
            return res.status(400).send({ err, success: false });
        }
    }
});