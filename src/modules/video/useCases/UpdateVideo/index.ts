import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { UpdateVideoController } from './UpdateVideoController';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';

export default async (): Promise<UpdateVideoController> => {
    const mongoVideosRepository = new MongoVideosRepository();

    const updateVideoUseCase = new UpdateVideoUseCase(mongoVideosRepository);

    return new UpdateVideoController(updateVideoUseCase);
};
