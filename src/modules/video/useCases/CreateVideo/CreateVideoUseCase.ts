import { delay, inject, injectable } from 'tsyringe';
import { HttpError } from '../../../../utils/errors/HttpError';
import { MongoVideosRepository } from '../../repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';
import { ICreateVideoRequestDTO } from './CreateVideoDTO';

@injectable()
export class CreateVideoUseCase {
    constructor(
        @inject(delay(() => MongoVideosRepository))
        private videosRepository: IVideosRepository,
    ) {}

    async execute(data: ICreateVideoRequestDTO): Promise<Video> {
        const videoAlreadyExists = await this.videosRepository.findByUrl(data.url);

        if (videoAlreadyExists) {
            throw new HttpError(400, 'This url is already registered.');
        }

        return this.videosRepository.createAndSave(data);
    }
}
