import { Request, Response } from 'express';
import { GetVideoByIdUseCase } from './GetVideoByIdUseCase';

export class GetVideoByIdController {
    constructor(private getVideoByIdUseCase: GetVideoByIdUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        try {
            const res = await this.getVideoByIdUseCase.execute(id);

            return response.json(res);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.',
            });
        }
    }
}
