import express from 'express';
import InvoceRoute from './invoice/invoice.route';
import PaymentRoute from './payment/payment.route';

import { verifyToken } from '../modules/auth';

const MainRouter = express.Router();

MainRouter.use('/invoice', verifyToken, InvoceRoute);
MainRouter.use('/payment', verifyToken, PaymentRoute);

export default MainRouter;