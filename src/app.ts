import 'reflect-metadata';
import express from 'express';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json())
    }
}

export default new App().app;
