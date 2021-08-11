import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { idValidationSchema } from '../../../../utils/validators/common';
import { RemoveVideoUseCase } from './RemoveVideoUseCase';

@injectable()
export class RemoveVideoController {
    constructor(
        @inject(delay(() => RemoveVideoUseCase))
        private removeVideoUseCase: RemoveVideoUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = await idValidationSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        await this.removeVideoUseCase.execute(id);

        return response.status(204).send();
    }
}
