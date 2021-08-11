import { container } from 'tsyringe';
import { RemoveVideoController } from './RemoveVideoController';
import { RemoveVideoUseCase } from './RemoveVideoUseCase';

container.registerSingleton<RemoveVideoUseCase>(
    'RemoveVideoUseCase',
    RemoveVideoUseCase,
);

container.registerSingleton<RemoveVideoController>(
    'RemoveVideoController',
    RemoveVideoController,
);
