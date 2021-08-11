import { container } from 'tsyringe';
import { MongoVideosRepository } from './repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from './repositories/IVideosRepository';
import { CreateVideoController } from './useCases/CreateVideo/CreateVideoController';
import { CreateVideoUseCase } from './useCases/CreateVideo/CreateVideoUseCase';
import { GetVideoByIdController } from './useCases/GetVideoById/GetVideoByIdController';
import { GetVideoByIdUseCase } from './useCases/GetVideoById/GetVideoByIdUseCase';
import { ListVideosController } from './useCases/ListVideos/ListVideosController';
import { ListVideosUseCase } from './useCases/ListVideos/ListVideosUseCase';
import { RemoveVideoController } from './useCases/RemoveVideo/RemoveVideoController';
import { RemoveVideoUseCase } from './useCases/RemoveVideo/RemoveVideoUseCase';
import { UpdateVideoController } from './useCases/UpdateVideo/UpdateVideoController';
import { UpdateVideoUseCase } from './useCases/UpdateVideo/UpdateVideoUseCase';

container.registerSingleton<IVideosRepository>(
    'MongoVideosRepository',
    MongoVideosRepository,
);

container.registerSingleton<CreateVideoUseCase>(
    'CreateVideoUseCase',
    CreateVideoUseCase,
);

container.registerSingleton<CreateVideoController>(
    'CreateVideoController',
    CreateVideoController,
);

container.registerSingleton<GetVideoByIdUseCase>(
    'GetVideoByIdUseCase',
    GetVideoByIdUseCase,
);

container.registerSingleton<GetVideoByIdController>(
    'GetVideoByIdController',
    GetVideoByIdController,
);

container.registerSingleton<ListVideosUseCase>(
    'ListVideosUseCase',
    ListVideosUseCase,
);

container.registerSingleton<ListVideosController>(
    'ListVideosController',
    ListVideosController,
);

container.registerSingleton<RemoveVideoUseCase>(
    'RemoveVideoUseCase',
    RemoveVideoUseCase,
);

container.registerSingleton<RemoveVideoController>(
    'RemoveVideoController',
    RemoveVideoController,
);

container.registerSingleton<UpdateVideoUseCase>(
    'UpdateVideoUseCase',
    UpdateVideoUseCase,
);

container.registerSingleton<UpdateVideoController>(
    'UpdateVideoController',
    UpdateVideoController,
);
