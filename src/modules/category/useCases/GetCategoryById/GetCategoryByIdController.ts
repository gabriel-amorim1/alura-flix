import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { idValidationSchema } from '../../../../utils/validators/common';
import { GetCategoryByIdUseCase } from './GetCategoryByIdUseCase';

@injectable()
class GetCategoryByIdController {
    constructor(
        @inject(delay(() => GetCategoryByIdUseCase))
        private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = await idValidationSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const categoryFound = await this.getCategoryByIdUseCase.execute(id);

        return response.json(categoryFound);
    }
}

export { GetCategoryByIdController };
