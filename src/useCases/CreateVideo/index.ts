import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { CreateVideoController } from './CreateVideoController';
import { CreateVideoUseCase } from './CreateVideoUseCase';

const mongoVideosRepository = new MongoVideosRepository();

const createVideoUseCase = new CreateVideoUseCase(mongoVideosRepository);

const createVideoController = new CreateVideoController(createVideoUseCase);

export { createVideoUseCase, createVideoController };
