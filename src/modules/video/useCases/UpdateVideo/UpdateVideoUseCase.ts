import Video from '../../schemas/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';
import { IUpdateVideoRequestDTO } from './UpdateVideoDTO';

export class UpdateVideoUseCase {
    constructor(private videosRepository: IVideosRepository) {}

    async execute(id: string, data: IUpdateVideoRequestDTO): Promise<Video> {
        const videoFound = await this.videosRepository.findById(id);

        if (!videoFound) {
            throw new Error('Video not found.');
        }

        if (data.url) {
            const videoAlreadyExists = await this.videosRepository.findByUrl(
                data.url,
            );

            if (videoAlreadyExists) {
                throw new Error('This url is already registered.');
            }
        }

        return this.videosRepository.createAndSave({ ...videoFound, ...data });
    }
}
