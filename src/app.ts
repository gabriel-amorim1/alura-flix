import 'reflect-metadata';
import express from 'express';
import { router } from './routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(router);
    }
}

export default new App().app;
