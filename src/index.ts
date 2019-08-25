import './config/config.ts';
import express from 'express';;
import * as core from 'express-serve-static-core';
import bodyParser from 'body-parser';
import rootRouter from './routeBuilder';
const app: core.Express = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // body parser will automatically parse JSON to object JS when req sth.
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use(rootRouter);

app.listen(port, () => {
    console.log(`started MockDataServer on port ${port}`);
});

export { app };
