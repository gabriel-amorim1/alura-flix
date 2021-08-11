import { container } from 'tsyringe';
import { UpdateVideoController } from './UpdateVideoController';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';

container.registerSingleton<UpdateVideoUseCase>(
    'UpdateVideoUseCase',
    UpdateVideoUseCase,
);

container.registerSingleton<UpdateVideoController>(
    'UpdateVideoController',
    UpdateVideoController,
);
