import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { ICreateVideoRequestDTO } from './CreateVideoDTO';
import { CreateVideoUseCase } from './CreateVideoUseCase';
import { createVideoSchema } from './CreateVideoValidators';

@injectable()
export class CreateVideoController {
    constructor(
        @inject(delay(() => CreateVideoUseCase))
        private createVideoUseCase: CreateVideoUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const data = (await createVideoSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        })) as ICreateVideoRequestDTO;

        const videoCreated = await this.createVideoUseCase.execute(data);
        const res = response.status(201).json(videoCreated);

        return res;
    }
}
