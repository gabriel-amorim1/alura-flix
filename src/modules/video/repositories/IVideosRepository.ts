import { ICreateVideoRequestDTO } from '../useCases/CreateVideo/CreateVideoDTO';
import Video from '../schemas/Video';

export interface IVideosRepository {
    findByUrl(url: string): Promise<Video | undefined>;
    createAndSave(video: ICreateVideoRequestDTO): Promise<Video>;
    list(): Promise<{ data: Video[]; count: number }>;
}
