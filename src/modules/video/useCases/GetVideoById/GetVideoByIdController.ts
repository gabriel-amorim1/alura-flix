import { Request, Response } from 'express';
import { idValidationSchema } from '../../../../utils/validators/common';
import { GetVideoByIdUseCase } from './GetVideoByIdUseCase';

export class GetVideoByIdController {
    constructor(private getVideoByIdUseCase: GetVideoByIdUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = await idValidationSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const res = await this.getVideoByIdUseCase.execute(id);

        return response.json(res);
    }
}
