import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { RemoveVideoController } from './RemoveVideoController';
import { RemoveVideoUseCase } from './RemoveVideoUseCase';

export default async (): Promise<RemoveVideoController> => {
    const mongoVideosRepository = new MongoVideosRepository();

    const removeVideoUseCase = new RemoveVideoUseCase(mongoVideosRepository);

    return new RemoveVideoController(removeVideoUseCase);
};
