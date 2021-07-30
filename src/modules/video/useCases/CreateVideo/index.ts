import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { CreateVideoController } from './CreateVideoController';
import { CreateVideoUseCase } from './CreateVideoUseCase';

export default async (): Promise<CreateVideoController> => {
    const mongoVideosRepository = new MongoVideosRepository();

    const createVideoUseCase = new CreateVideoUseCase(mongoVideosRepository);

    return new CreateVideoController(createVideoUseCase);
};
