import { container } from 'tsyringe';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../repositories/implementations/MongoCategoriesRepository';
import { CreateCategoryController } from '../useCases/CreateCategory/CreateCategoryController';
import { CreateCategoryUseCase } from '../useCases/CreateCategory/CreateCategoryUseCase';

container.registerSingleton<ICategoriesRepository>(
    'MongoCategoriesRepository',
    MongoCategoriesRepository,
);

container.registerSingleton<CreateCategoryUseCase>(
    'CreateCategoryUseCase',
    CreateCategoryUseCase,
);

container.registerSingleton<CreateCategoryController>(
    'CreateCategoryController',
    CreateCategoryController,
);
