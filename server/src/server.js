import express from 'express';
import setupMiddleware from './middleware';
import MainRouter from './api/resources';
import { connect } from './db';

const app = express();
setupMiddleware(app);
connect().catch((err) => {
    console.error('DB error', err);
});

app.use('/', MainRouter);

export default app;