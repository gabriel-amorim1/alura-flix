import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../schemas/Category';

@injectable()
class GetCategoryByIdUseCase {
    constructor(
        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(id: string): Promise<Category> {
        const categoryFound = await this.categoriesRepository.findById(id);

        if (!categoryFound) {
            throw new HttpError(404, 'Category not found');
        }

        return categoryFound;
    }
}

export { GetCategoryByIdUseCase };
