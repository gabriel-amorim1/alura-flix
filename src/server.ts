import 'reflect-metadata';
import app from './app';

import { connection } from './database/connection';

async function startServer() {
    await connection;

    app.listen(3333, () => {
        console.log(`Service running on port 3333`);
    });
}

startServer();
