import app from './app';

async function startServer() {
    app.listen(3333, () => {
        console.log(`Service running on port 3333`);
    });
}

startServer();
