import { delay, inject, injectable } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../schemas/Category';

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(
        showDeletedCategories: boolean,
    ): Promise<{ data: Category[]; count: number }> {
        let options: FindManyOptions<Category> = {};

        if (!showDeletedCategories) {
            options = { where: { deleted_at: null } };
        }

        return this.categoriesRepository.list(options);
    }
}

export { ListCategoriesUseCase };
