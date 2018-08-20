import express from 'express';
import InvoceRoute from './invoice/invoice.route';

import Auth from '../modules/auth';

const MainRouter = express.Router();

MainRouter.use('/invoice', Auth.verify, InvoceRoute);

export default MainRouter;