import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../../category/repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../../category/repositories/implementations/MongoCategoriesRepository';
import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';

@injectable()
export class GetVideoByIdUseCase {
    constructor(
        @inject(delay(() => MongoVideosRepository))
        private videosRepository: IVideosRepository,

        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(id: string): Promise<Video> {
        const videoFound = await this.videosRepository.findById(id);

        if (!videoFound) {
            throw new HttpError(404, 'Video not found');
        }

        if (videoFound.category_id) {
            videoFound.category = await this.categoriesRepository.findById(
                videoFound.category_id,
            );
        }

        return videoFound;
    }
}
