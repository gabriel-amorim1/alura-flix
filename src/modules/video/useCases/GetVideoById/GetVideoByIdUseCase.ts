import Video from '../../schemas/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

export class GetVideoByIdUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(id: string): Promise<Video> {
        const videoFound = await this.videosRepository.findById(id);

        if (!videoFound) {
            throw new Error('Video not found.');
        }

        return videoFound;
    }
}
