import 'reflect-metadata';
import connect from './database/connection';
import './containers';
import app from './app';

async function startServer() {
    await connect();

    app.listen(3333, () => {
        console.log(`Service running on port 3333`);
    });
}

startServer();
