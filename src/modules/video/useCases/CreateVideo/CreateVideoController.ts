import { Request, Response } from 'express';
import { ICreateVideoRequestDTO } from './CreateVideoDTO';
import { CreateVideoUseCase } from './CreateVideoUseCase';
import { createVideoSchema } from './CreateVideoValidators';

export class CreateVideoController {
    constructor(private createVideoUseCase: CreateVideoUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const data = (await createVideoSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        })) as ICreateVideoRequestDTO;

        const videoCreated = await this.createVideoUseCase.execute(data);

        return response.status(201).json(videoCreated);
    }
}
