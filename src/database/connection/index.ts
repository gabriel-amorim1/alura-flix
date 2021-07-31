import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';
import { Connection, createConnections } from 'typeorm';

let mongo_data: MongoMemoryServer;

export default async (isTesting = false): Promise<Connection[]> => {
    let mongoUrl = `mongodb://localhost:27017`;

    if (isTesting) {
        mongo_data = await MongoMemoryServer.create();

        mongoUrl = mongo_data.getUri();

        const connections = await createConnections([
            {
                name: 'default',
                url: mongoUrl,
                type: 'mongodb',
                useUnifiedTopology: true,
                entities: [
                    `${path.resolve(
                        __dirname,
                        '../../modules/**/schemas',
                    )}/*.{ts,js}`,
                ],
            },
        ]);

        return connections;
    }

    return createConnections();
};

export const stopMongo = async (): Promise<void> => {
    await mongo_data.stop();
};
