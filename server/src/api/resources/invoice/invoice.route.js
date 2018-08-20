import express from 'express';
import InvoiceController from './invoice.controller';

const InvoiceRouter = express.Router();

InvoiceRouter.param('invoiceId', InvoiceController.findByParam);

InvoiceRouter.route('/')
    .post(InvoiceController.createOne);

InvoiceRouter.route('/:invoiceId')
    .get(InvoiceController.getOne)
    .delete(InvoiceController.deleteOne);

export default InvoiceRouter;