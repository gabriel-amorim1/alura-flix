import { FindManyOptions } from 'typeorm';
import Video from '../schemas/Video';
import { ICreateVideoRequestDTO } from '../useCases/CreateVideo/CreateVideoDTO';

export interface IVideosRepository {
    findByUrl(url: string): Promise<Video | undefined>;
    findById(id: string): Promise<Video | undefined>;
    createAndSave(video: ICreateVideoRequestDTO): Promise<Video>;
    list(options: FindManyOptions<Video>): Promise<{ data: Video[]; count: number }>;
    remove(video: Video): Promise<Video>;
}
