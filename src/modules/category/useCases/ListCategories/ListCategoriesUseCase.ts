import Category from '../../schemas/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute(): Promise<{ data: Category[]; count: number }> {
        return this.categoriesRepository.list();
    }
}

export { ListCategoriesUseCase };
