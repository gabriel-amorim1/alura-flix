import Video from '../../database/schemas/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import { ICreateVideoRequestDTO } from './CreateVideoDTO';

export class CreateVideoUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(data: ICreateVideoRequestDTO): Promise<Video> {
        const videoAlreadyExists = await this.videosRepository.findByUrl(data.url);

        if (videoAlreadyExists) {
            throw new Error('This url is already registered.');
        }

        return this.videosRepository.createAndSave(data);
    }
}
