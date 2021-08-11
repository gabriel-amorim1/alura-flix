import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { createCategorySchema } from './CreateCategoryValidators';

@injectable()
class CreateCategoryController {
    constructor(
        @inject(delay(() => CreateCategoryUseCase))
        private createCategoryUseCase: CreateCategoryUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const body = await createCategorySchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const categoryCreated = await this.createCategoryUseCase.execute(body);

        return response.status(201).json(categoryCreated);
    }
}

export { CreateCategoryController };
