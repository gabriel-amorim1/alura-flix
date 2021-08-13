import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../schemas/Category';

@injectable()
class RemoveCategoryUseCase {
    constructor(
        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(id: string): Promise<Category> {
        const category = await this.categoriesRepository.findById(id);

        if (!category) {
            throw new HttpError(404, 'Category not found');
        }

        if (category.deleted_at) {
            throw new HttpError(400, 'This category is already deleted');
        }

        return this.categoriesRepository.remove(category);
    }
}

export { RemoveCategoryUseCase };
