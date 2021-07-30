import { getMongoRepository, MongoRepository } from 'typeorm';
import { ICreateVideoRequestDTO } from '../../useCases/CreateVideo/CreateVideoDTO';
import Video from '../../schemas/Video';
import { IVideosRepository } from '../IVideosRepository';

export class MongoVideosRepository implements IVideosRepository {
    private ormRepository: MongoRepository<Video>;

    constructor() {
        this.ormRepository = getMongoRepository(Video);
    }

    async findByUrl(url: string): Promise<Video | undefined> {
        return this.ormRepository.findOne({ where: { url } });
    }

    async createAndSave(data: ICreateVideoRequestDTO): Promise<Video> {
        const video = this.ormRepository.create(data);

        return this.ormRepository.save(video);
    }

    async list(): Promise<{ data: Video[]; count: number }> {
        const [data, count] = await this.ormRepository.findAndCount();

        return { data, count };
    }
}
