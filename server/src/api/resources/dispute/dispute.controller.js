import DisputeModel from './dispute.model';
import InvoiceModel from '../invoice/invoice.model';
import generateController from '../../modules/generateController';
import { sendDisputeMail } from '../../modules/mailer';

const DisputeController = generateController(DisputeModel, {
    getInvoiceId: (req, res, next) => {
        const _id = req.params.invoiceId;

        InvoiceModel.findOne({ _id }, (err, doc) => {
            if (err) return res.status(400).send({ error: { message: 'Invoice with id does not exits' }, success: false });
            req.invoice = doc;
            next()
        });
    },
    createOne: (req, res) => {
        const body = req.body;
        const { marchantEmail, customerEmail, customerName, _id } = req.invoice;
        body.status = "open";
        body.invoiceId = _id;
        DisputeModel.create(body, async (err, doc) => {
            if (err) return res.status(400).send({ error: { message: 'Could not create the dispute' }, success: false });

            try {
                await sendDisputeMail(marchantEmail, customerEmail, customerName, body.reason, body.from);
                res.send({ data: doc, success: true });
            } catch (err) {
                return res.status(400).send({ error: { message: 'Could not send mail' }, success: false });
            }
        });
    },
    getOne: (req, res) => {
        const invoiceId = req.params.invoiceId;
        DisputeModel.findOne({ invoiceId }, async (err, doc) => {
            if (err) return res.status(400).send({ error: { message: 'Find dispute' }, success: false });
            res.send({ data: doc, success: true });
        });
    }
});

export default DisputeController;