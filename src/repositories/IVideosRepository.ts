import { ICreateVideoRequestDTO } from '../useCases/CreateVideo/CreateVideoDTO';
import Video from '../database/schemas/Video';

export interface IVideosRepository {
    findByUrl(url: string): Promise<Video | undefined>;
    createAndSave(video: ICreateVideoRequestDTO): Promise<Video>;
}
