import express, { Express, Request, Response, NextFunction } from 'express';
import router from './routes/index';
import { config }from './config/env.config';

// ---------SETUP---------
const app: Express = express();
app.set('env', config.env);
app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ---------ROUTES---------
app.use('/', router);


// ---------ErrHANDLER---------
// Catch 404
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Not Found',
        statusCode: 404,
        requested_url: req.path,
    });
});

// App Error Handler
app.use((err: any, req: Request, res: Response) => {
    res.status(err.status).json({
        message: err.message,
        requested_url: req.path,
    });
});
  

export default app;
