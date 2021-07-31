import { Request, Response } from 'express';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';

export class UpdateVideoController {
    constructor(private updateVideoUseCase: UpdateVideoUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description, url } = request.body;
        const { id } = request.params;

        try {
            const videoUpdated = await this.updateVideoUseCase.execute(id, {
                title,
                description,
                url,
            });

            return response.json(videoUpdated);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.',
            });
        }
    }
}
