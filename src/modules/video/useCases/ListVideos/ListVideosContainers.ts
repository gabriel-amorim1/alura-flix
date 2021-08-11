import { container } from 'tsyringe';
import { ListVideosController } from './ListVideosController';
import { ListVideosUseCase } from './ListVideosUseCase';

container.registerSingleton<ListVideosUseCase>(
    'ListVideosUseCase',
    ListVideosUseCase,
);

container.registerSingleton<ListVideosController>(
    'ListVideosController',
    ListVideosController,
);
