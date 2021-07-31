import { ICreateVideoRequestDTO } from '../useCases/CreateVideo/CreateVideoDTO';
import Video from '../schemas/Video';

export interface IVideosRepository {
    findByUrl(url: string): Promise<Video | undefined>;
    findById(id: string): Promise<Video | undefined>;
    createAndSave(video: ICreateVideoRequestDTO): Promise<Video>;
    list(options: any): Promise<{ data: Video[]; count: number }>;
    remove(video: Video): Promise<Video>;
}
