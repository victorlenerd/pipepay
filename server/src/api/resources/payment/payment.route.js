import express from 'express';
import PaymentController from './payment.controller';

const Router = express.Router();

Router.param('/:id', PaymentController.findByParam);

Router.route('/')
    .post(PaymentController.createOne);

Router.route('/:id')
    .get(PaymentController.getOne);

export default Router;