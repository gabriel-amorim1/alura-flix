import { FindManyOptions, getMongoRepository, MongoRepository } from 'typeorm';
import Category from '../../schemas/Category';
import { ICreateCategoryRequestDTO } from '../../useCases/CreateCategory/CreateCategoryDTO';
import { ICategoriesRepository } from '../ICategoriesRepository';

class MongoCategoriesRepository implements ICategoriesRepository {
    private ormRepository: MongoRepository<Category>;

    constructor() {
        this.ormRepository = getMongoRepository(Category);
    }

    async findByTitle(title: string): Promise<Category | undefined> {
        return this.ormRepository.findOne({ where: { title } });
    }

    async findById(id: string): Promise<Category | undefined> {
        return this.ormRepository.findOne(id);
    }

    async createAndSave(data: ICreateCategoryRequestDTO): Promise<Category> {
        const category = this.ormRepository.create(data);

        return this.ormRepository.save(category);
    }

    async list(
        options: FindManyOptions<Category>,
    ): Promise<{ data: Category[]; count: number }> {
        const [data, count] = await this.ormRepository.findAndCount(options);

        return { data, count };
    }

    async remove(category: Category): Promise<Category> {
        return this.ormRepository.softRemove(category);
    }
}

export { MongoCategoriesRepository };
