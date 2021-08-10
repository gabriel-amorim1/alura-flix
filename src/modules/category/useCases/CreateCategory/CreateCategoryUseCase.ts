import Category from '../../schemas/Category';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICreateCategoryRequestDTO } from './CreateCategoryDTO';

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute(data: ICreateCategoryRequestDTO): Promise<Category> {
        const categoryAlreadyExists = await this.categoriesRepository.findByTitle(
            data.title,
        );

        if (categoryAlreadyExists) {
            throw new HttpError(400, 'This title is already registered.');
        }

        return this.categoriesRepository.createAndSave(data);
    }
}

export { CreateCategoryUseCase };
