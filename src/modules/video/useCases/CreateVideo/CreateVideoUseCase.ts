import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../../category/repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../../category/repositories/implementations/MongoCategoriesRepository';
import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';
import { ICreateVideoRequestDTO } from './CreateVideoDTO';

@injectable()
export class CreateVideoUseCase {
    constructor(
        @inject(delay(() => MongoVideosRepository))
        private videosRepository: IVideosRepository,

        @inject(delay(() => MongoCategoriesRepository))
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(data: ICreateVideoRequestDTO): Promise<Video> {
        const videoAlreadyExists = await this.videosRepository.findByUrl(data.url);

        if (videoAlreadyExists) {
            throw new HttpError(400, 'Url already registered');
        }

        let category;

        if (data.category_id) {
            category = await this.categoriesRepository.findById(data.category_id);

            if (!category) {
                throw new HttpError(404, 'Category not found');
            }
        }

        const createdVideo = await this.videosRepository.createAndSave(data);

        return { ...createdVideo, category };
    }
}
