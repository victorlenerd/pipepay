import express from 'express';
import setupMiddleware from './middleware';
const app = express();

setupMiddleware(app);

app.get('/', (req, res, next) => {
    res.send("Hello, World!");
});

export default app;