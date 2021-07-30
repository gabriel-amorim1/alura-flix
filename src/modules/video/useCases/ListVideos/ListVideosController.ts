import { Request, Response } from 'express';
import { ListVideosUseCase } from './ListVideosUseCase';

export class ListVideosController {
    constructor(private listVideosUseCase: ListVideosUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const videos = await this.listVideosUseCase.execute();

        return response.json(videos);
    }
}
