import Video from '../../schemas/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

export class ListVideosUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(
        showDeletedVideos: boolean,
    ): Promise<{ data: Video[]; count: number }> {
        let options;

        if (!showDeletedVideos) {
            options = { where: { deleted_at: null } };
        }

        return this.videosRepository.list(options);
    }
}
