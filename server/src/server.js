import express from 'express';
import setupMiddleware from './middleware';
import MainRouter from './api/resources';
import { connect } from './db';
import { getJWT } from './api/modules/auth';

const app = express();
getJWT();
setupMiddleware(app);
connect().catch((err) => {
    console.error('DB error', err);
});

app.use('/', MainRouter);

export default app;