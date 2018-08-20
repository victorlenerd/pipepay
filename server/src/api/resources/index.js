import express from 'express';
import InvoceRoute from './invoice/invoice.route';
import PaymentRoute from './payment/payment.route';

import Auth from '../modules/auth';

const MainRouter = express.Router();

MainRouter.use('/invoice', Auth.verify, InvoceRoute);
MainRouter.use('/payment', Auth.verify, PaymentRoute);

export default MainRouter;