import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';

@injectable()
export class GetVideoByIdUseCase {
    constructor(
        @inject(delay(() => MongoVideosRepository))
        private videosRepository: IVideosRepository,
    ) {}

    async execute(id: string): Promise<Video> {
        const videoFound = await this.videosRepository.findById(id);

        if (!videoFound) {
            throw new HttpError(404, 'Video not found.');
        }

        return videoFound;
    }
}
