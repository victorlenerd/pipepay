import express from 'express';
import InvoiceModel from '../invoice/invoice.model';
import Transfer from '../../modules/transfer';

const ConfirmRouter = express.Router();

ConfirmRouter.route('/:invoiceId')
    .post((req, res) => {
        const invoiceId = req.params.invoiceId;
        const status = req.body.accepted ? 'accepted' : 'rejected';

        InvoiceModel.findOneAndUpdate({ _id: invoiceId }, { $set: { status } }, {new: true}, async (error, data) => {
            if (error) res.status(400).send({ success: false, error });
            
            await Transfer();
            //if accepted is true do transfer to marchant

            res.status(200).send({ success: true, data });
        });
    });


export default ConfirmRouter;