import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../schemas/Category';
import { IUpdateCategoryRequestDTO } from './UpdateCategoryDTO';

@injectable()
class UpdateCategoryUseCase {
    constructor(
        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(
        id: string,
        updateBody: IUpdateCategoryRequestDTO,
    ): Promise<Category> {
        const categoryFound = await this.categoriesRepository.findById(id);

        if (!categoryFound) {
            throw new HttpError(404, 'Category not found');
        }

        if (updateBody.title) {
            await this.categoriesRepository.findByTitle(updateBody.title);
        }

        return this.categoriesRepository.createAndSave({
            ...categoryFound,
            ...updateBody,
        });
    }
}

export { UpdateCategoryUseCase };
