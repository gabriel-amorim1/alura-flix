import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { idValidationSchema } from '../../../../utils/validators/common';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';
import { updateCategorySchema } from './UpdateCategoryValidators';

@injectable()
class UpdateCategoryController {
    constructor(
        @inject(delay(() => UpdateCategoryUseCase))
        private updateCategoryUseCase: UpdateCategoryUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = await idValidationSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const body = await updateCategorySchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const categoryUpdated = await this.updateCategoryUseCase.execute(id, body);

        return response.json(categoryUpdated);
    }
}

export { UpdateCategoryController };
