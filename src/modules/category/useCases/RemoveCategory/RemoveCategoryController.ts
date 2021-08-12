import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { idValidationSchema } from '../../../../utils/validators/common';
import { RemoveCategoryUseCase } from './RemoveCategoryUseCase';

@injectable()
class RemoveCategoryController {
    constructor(
        @inject(delay(() => RemoveCategoryUseCase))
        private removeCategoryUseCase: RemoveCategoryUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = await idValidationSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        await this.removeCategoryUseCase.execute(id);

        return response.status(204).send();
    }
}

export { RemoveCategoryController };
