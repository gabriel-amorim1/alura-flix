import { delay, inject, injectable } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';

@injectable()
export class ListVideosUseCase {
    constructor(
        @inject(delay(() => MongoVideosRepository))
        private videosRepository: IVideosRepository,
    ) {}

    async execute(
        showDeletedVideos: boolean,
    ): Promise<{ data: Video[]; count: number }> {
        let options: FindManyOptions<Video> = {};

        if (!showDeletedVideos) {
            options = { where: { deleted_at: null } };
        }

        return this.videosRepository.list(options);
    }
}
