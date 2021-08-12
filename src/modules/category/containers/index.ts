import { container } from 'tsyringe';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../repositories/implementations/MongoCategoriesRepository';
import { CreateCategoryController } from '../useCases/CreateCategory/CreateCategoryController';
import { CreateCategoryUseCase } from '../useCases/CreateCategory/CreateCategoryUseCase';
import { GetCategoryByIdController } from '../useCases/GetCategoryById/GetCategoryByIdController';
import { GetCategoryByIdUseCase } from '../useCases/GetCategoryById/GetCategoryByIdUseCase';
import { ListCategoriesController } from '../useCases/ListCategories/ListCategoriesController';
import { ListCategoriesUseCase } from '../useCases/ListCategories/ListCategoriesUseCase';
import { RemoveCategoryController } from '../useCases/RemoveCategory/RemoveCategoryController';
import { RemoveCategoryUseCase } from '../useCases/RemoveCategory/RemoveCategoryUseCase';
import { UpdateCategoryController } from '../useCases/UpdateCategory/UpdateCategoryController';
import { UpdateCategoryUseCase } from '../useCases/UpdateCategory/UpdateCategoryUseCase';

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

container.registerSingleton<ListCategoriesUseCase>(
    'ListCategoriesUseCase',
    ListCategoriesUseCase,
);

container.registerSingleton<ListCategoriesController>(
    'ListCategoriesController',
    ListCategoriesController,
);

container.registerSingleton<GetCategoryByIdUseCase>(
    'GetCategoryByIdUseCase',
    GetCategoryByIdUseCase,
);

container.registerSingleton<GetCategoryByIdController>(
    'GetCategoryByIdController',
    GetCategoryByIdController,
);

container.registerSingleton<UpdateCategoryUseCase>(
    'UpdateCategoryUseCase',
    UpdateCategoryUseCase,
);

container.registerSingleton<UpdateCategoryController>(
    'UpdateCategoryController',
    UpdateCategoryController,
);

container.registerSingleton<RemoveCategoryUseCase>(
    'RemoveCategoryUseCase',
    RemoveCategoryUseCase,
);

container.registerSingleton<RemoveCategoryController>(
    'RemoveCategoryController',
    RemoveCategoryController,
);
