import { container } from 'tsyringe';
import { GetVideoByIdController } from './GetVideoByIdController';
import { GetVideoByIdUseCase } from './GetVideoByIdUseCase';

container.registerSingleton<GetVideoByIdUseCase>(
    'GetVideoByIdUseCase',
    GetVideoByIdUseCase,
);

container.registerSingleton<GetVideoByIdController>(
    'GetVideoByIdController',
    GetVideoByIdController,
);
