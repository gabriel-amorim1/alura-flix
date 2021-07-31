import { HttpError } from '../../../../utils/errors/HttpError';
import { IVideosRepository } from '../../repositories/IVideosRepository';

export class RemoveVideoUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(id: string): Promise<void> {
        const videoFound = await this.videosRepository.findById(id);

        if (!videoFound) {
            throw new HttpError(404, 'Video not found.');
        }

        if (videoFound.deleted_at) {
            throw new HttpError(400, 'This video is already deleted.');
        }

        await this.videosRepository.remove(videoFound);
    }
}
