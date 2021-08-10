import { getMongoRepository, MongoRepository } from 'typeorm';
import { ICreateCategoryRequestDTO } from '../../useCases/CreateCategory/CreateCategoryDTO';
import Category from '../../schemas/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class MongoCategoriesRepository implements ICategoriesRepository {
    private ormRepository: MongoRepository<Category>;

    constructor() {
        this.ormRepository = getMongoRepository(Category);
    }

    findByTitle(title: string): Promise<Category | undefined> {
        return this.ormRepository.findOne({ where: { title } });
    }

    createAndSave(data: ICreateCategoryRequestDTO): Promise<Category> {
        const category = this.ormRepository.create(data);

        return this.ormRepository.save(category);
    }
}

export { MongoCategoriesRepository };
