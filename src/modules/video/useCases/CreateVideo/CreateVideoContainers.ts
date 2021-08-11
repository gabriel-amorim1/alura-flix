import { container } from 'tsyringe';
import { CreateVideoController } from './CreateVideoController';
import { CreateVideoUseCase } from './CreateVideoUseCase';

container.registerSingleton<CreateVideoUseCase>(
    'CreateVideoUseCase',
    CreateVideoUseCase,
);

container.registerSingleton<CreateVideoController>(
    'CreateVideoController',
    CreateVideoController,
);
