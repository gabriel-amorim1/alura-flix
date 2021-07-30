import { Request, Response } from 'express';
import { CreateVideoUseCase } from './CreateVideoUseCase';

export class CreateVideoController {
    constructor(private createVideoUseCase: CreateVideoUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description, url } = request.body;

        try {
            await this.createVideoUseCase.execute({ title, description, url });

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.',
            });
        }
    }
}
