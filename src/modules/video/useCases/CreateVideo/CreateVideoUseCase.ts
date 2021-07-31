import { HttpError } from '../../../../utils/errors/HttpError';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import Video from '../../schemas/Video';
import { ICreateVideoRequestDTO } from './CreateVideoDTO';

export class CreateVideoUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(data: ICreateVideoRequestDTO): Promise<Video> {
        const videoAlreadyExists = await this.videosRepository.findByUrl(data.url);

        if (videoAlreadyExists) {
            throw new HttpError(400, 'This url is already registered.');
        }

        return this.videosRepository.createAndSave(data);
    }
}
