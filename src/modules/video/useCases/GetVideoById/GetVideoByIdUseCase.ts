import { HttpError } from '../../../../utils/errors/HttpError';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';

export class GetVideoByIdUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(id: string): Promise<Video> {
        const videoFound = await this.videosRepository.findById(id);

        if (!videoFound) {
            throw new HttpError(404, 'Video not found.');
        }

        return videoFound;
    }
}
