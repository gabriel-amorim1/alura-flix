import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

@injectable()
class ListCategoriesController {
    constructor(
        @inject(delay(() => ListCategoriesUseCase))
        private createCategoryUseCase: ListCategoriesUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const categories = await this.createCategoryUseCase.execute();

        return response.json(categories);
    }
}

export { ListCategoriesController };
