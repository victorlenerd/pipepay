import express from 'express';
import InvoiceModel from '../invoice/invoice.model';
import { sendPaymentRequest } from '../../modules/mailer';
const Router = express.Router();


Router.route('/:invoiceId/:milestoneId')
    .get(async (req, res) => {
        const { invoiceId, milestoneId } = req.params;
        
        try {
            const { milestones, customerEmail, marchantName } = await InvoiceModel.findOne({ _id: invoiceId });
            const [ milestone ] = milestones.filter(({ _id }) => _id !== milestoneId);

            if (milestone && !milestone.paid) {
                await sendPaymentRequest(milestone, customerEmail, marchantName);
                res.status(200).send({ success: true });
            } else {
                res.status(400).send({ success: false, error: { message: 'Milestone already paid for' } });
            }
        } catch(err) {
            console.log('error...');
            if (err) console.log(err);
            if (err) res.status(400).send({ success: false, error: err});
        }

    });

export default Router;