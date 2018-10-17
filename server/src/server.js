import express from 'express';
import setupMiddleware from './middleware';
import MainRouter from './api/resources';
import { connect } from './db';
import { getJWT } from './api/modules/auth';

const app = express();

getJWT();
setupMiddleware(app);

debugger
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

connect().catch((err) => {
    console.error('DB error', err);
});

app.use('/api', MainRouter);

export default app;