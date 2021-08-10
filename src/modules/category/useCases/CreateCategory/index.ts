import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export default async (): Promise<CreateCategoryController> => {
    const mongoCategoryRepository = new MongoCategoriesRepository();

    const createCategoryUseCase = new CreateCategoryUseCase(mongoCategoryRepository);

    return new CreateCategoryController(createCategoryUseCase);
};
