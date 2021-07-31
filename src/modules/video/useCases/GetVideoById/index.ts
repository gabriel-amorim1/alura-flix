import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { GetVideoByIdController } from './GetVideoByIdController';
import { GetVideoByIdUseCase } from './GetVideoByIdUseCase';

export default async (): Promise<GetVideoByIdController> => {
    const mongoVideosRepository = new MongoVideosRepository();

    const getVideoByIdUseCase = new GetVideoByIdUseCase(mongoVideosRepository);

    return new GetVideoByIdController(getVideoByIdUseCase);
};
