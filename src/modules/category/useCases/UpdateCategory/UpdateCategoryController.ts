import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

@injectable()
class UpdateCategoryController {
    constructor(
        @inject(delay(() => UpdateCategoryUseCase))
        private updateCategoryUseCase: UpdateCategoryUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { body } = request;

        const categoryUpdated = await this.updateCategoryUseCase.execute(id, body);

        return response.json(categoryUpdated);
    }
}

export { UpdateCategoryController };
