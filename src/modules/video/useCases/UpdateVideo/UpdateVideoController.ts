import { Request, Response } from 'express';
import { idValidationSchema } from '../../../../utils/validators/common';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';
import { updateVideoValidationSchema } from './UpdateVideoValidators';

export class UpdateVideoController {
    constructor(private updateVideoUseCase: UpdateVideoUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const body = await updateVideoValidationSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const { id } = await idValidationSchema.validate(request.params, {
            abortEarly: false,
            stripUnknown: true,
        });

        const videoUpdated = await this.updateVideoUseCase.execute(id, body);

        return response.json(videoUpdated);
    }
}
