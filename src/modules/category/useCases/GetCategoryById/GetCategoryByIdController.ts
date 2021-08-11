import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { GetCategoryByIdUseCase } from './GetCategoryByIdUseCase';

@injectable()
class GetCategoryByIdController {
    constructor(
        @inject(delay(() => GetCategoryByIdUseCase))
        private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const categoryFound = await this.getCategoryByIdUseCase.execute(id);

        return response.json(categoryFound);
    }
}

export { GetCategoryByIdController };
