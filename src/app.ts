import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

require('express-async-errors');

import { router } from './routes';
import { ValidationError } from 'yup';
import { HttpError } from './utils/errors/HttpError';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(router);
        this.app.use(App.errorHandling);
        this.app.disable('x-powered-by');
    }

    private static errorHandling(
        error: Error | ValidationError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { code, message, errors } = <any>error;

        const apiError = {
            code:
                <any>error instanceof ValidationError ||
                <any>error instanceof HttpError
                ? code : 500,
            message,
            errors,
        };

        if (<any>error instanceof ValidationError && !code) {
            apiError.code = 400;
        }

        return res.status(apiError.code || 500).send(apiError);
    }
}

export default new App().app;
