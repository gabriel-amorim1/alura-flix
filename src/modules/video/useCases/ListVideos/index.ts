import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { ListVideosController } from './ListVideosController';
import { ListVideosUseCase } from './ListVideosUseCase';

export default async (): Promise<ListVideosController> => {
    const mongoVideosRepository = new MongoVideosRepository();

    const listVideosUseCase = new ListVideosUseCase(mongoVideosRepository);

    return new ListVideosController(listVideosUseCase);
};
