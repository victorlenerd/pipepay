import express from 'express';
import VerifyRoute from './verify/verify.route';
import InvoceRoute from './invoice/invoice.route';
import PaymentRoute from './payment/payment.route';
import DisputeRoute from './dispute/dispute.route';
import ConfirmRoute from './confirm/confirm.route';
import BanksRoute from './banks/banks.route';

import { verifyToken } from '../modules/auth';

const MainRouter = express.Router();

MainRouter.use('/verify', VerifyRoute);
MainRouter.use('/banks', BanksRoute);
MainRouter.use('/confirm', ConfirmRoute);
MainRouter.use('/dispute', DisputeRoute);
MainRouter.use('/invoice', verifyToken, InvoceRoute);
MainRouter.use('/payment', verifyToken, PaymentRoute);

export default MainRouter;