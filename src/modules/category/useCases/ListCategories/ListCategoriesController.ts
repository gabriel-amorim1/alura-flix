import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { listCategoriesValidatorSchema } from './ListCategoriesValidators';

@injectable()
class ListCategoriesController {
    constructor(
        @inject(delay(() => ListCategoriesUseCase))
        private createCategoryUseCase: ListCategoriesUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const query = await listCategoriesValidatorSchema.validate(request.query, {
            abortEarly: false,
            stripUnknown: true,
        });

        const showDeletedVideos = query.showDeletedCategories || false;

        const categories = await this.createCategoryUseCase.execute(
            showDeletedVideos,
        );

        return response.json(categories);
    }
}

export { ListCategoriesController };
