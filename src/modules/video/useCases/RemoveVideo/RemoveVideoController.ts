import { Request, Response } from 'express';
import { RemoveVideoUseCase } from './RemoveVideoUseCase';

export class RemoveVideoController {
    constructor(private removeVideoUseCase: RemoveVideoUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        try {
            await this.removeVideoUseCase.execute(id);

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.',
            });
        }
    }
}
