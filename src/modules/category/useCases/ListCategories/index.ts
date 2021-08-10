import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export default async (): Promise<ListCategoriesController> => {
    const mongoCategoryRepository = new MongoCategoriesRepository();

    const createCategoryUseCase = new ListCategoriesUseCase(mongoCategoryRepository);

    return new ListCategoriesController(createCategoryUseCase);
};
