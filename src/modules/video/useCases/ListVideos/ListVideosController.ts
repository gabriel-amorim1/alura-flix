import { Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { ListVideosUseCase } from './ListVideosUseCase';
import { listVideosValidatorSchema } from './ListVideosValidators';

@injectable()
export class ListVideosController {
    constructor(
        @inject(delay(() => ListVideosUseCase))
        private listVideosUseCase: ListVideosUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const query = await listVideosValidatorSchema.validate(request.query, {
            abortEarly: false,
            stripUnknown: true,
        });

        const showDeletedVideos = query.showDeletedVideos || false;

        const videos = await this.listVideosUseCase.execute(showDeletedVideos);

        return response.json(videos);
    }
}
