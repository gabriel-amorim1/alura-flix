import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../schemas/Category';
import { ICreateCategoryRequestDTO } from './CreateCategoryDTO';

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

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
