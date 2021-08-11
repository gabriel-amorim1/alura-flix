import { container } from 'tsyringe';
import { MongoVideosRepository } from './implementations/MongoVideosRepository';
import { IVideosRepository } from './IVideosRepository';

container.registerSingleton<IVideosRepository>(
    'MongoVideosRepository',
    MongoVideosRepository,
);
