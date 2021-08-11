import { delay, inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../schemas/Category';

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(): Promise<{ data: Category[]; count: number }> {
        return this.categoriesRepository.list();
    }
}

export { ListCategoriesUseCase };
