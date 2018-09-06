import express from 'express';
import InvoiceModel from '../invoice/invoice.model';
import Transfer from '../../modules/transfer';
import DisputeController from '../dispute/dispute.controller';

const ConfirmRouter = express.Router();

ConfirmRouter.param('invoiceId', DisputeController.getInvoiceId);
ConfirmRouter.route('/:invoiceId')
    .post((req, res) => {
        const invoiceId = req.params.invoiceId;
        const status = req.body.accepted ? 'accepted' : 'rejected';
        const emailCode = req.body.emailCode;

        if (req.invoice.verifyCode !== emailCode) return res.status(400).send({ success: false, error: new Error('Wrong invoice code') });

        InvoiceModel.findOneAndUpdate({ _id: invoiceId }, { $set: { status } }, {new: true}, async (error, data) => {
            if (error) res.status(400).send({ success: false, error });

            if (status === "accepted") {
                try {
                    await Transfer(data['marchantName'], data['marchantAccountNumber'], data['marchantBankCode'], data['purchaseAmount'] * 100);
                } catch(err) {
                    res.status(400).send({ success: false, err });
                }
            }

            res.status(200).send({ success: true, data });
        });
    });


export default ConfirmRouter;