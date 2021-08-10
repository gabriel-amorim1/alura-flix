import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private createCategoryUseCase: ListCategoriesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const categories = await this.createCategoryUseCase.execute();

        return response.json(categories);
    }
}

export { ListCategoriesController };
