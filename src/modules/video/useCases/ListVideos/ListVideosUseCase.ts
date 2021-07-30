import Video from '../../schemas/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

export class ListVideosUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(): Promise<{ data: Video[]; count: number }> {
        return this.videosRepository.list();
    }
}
