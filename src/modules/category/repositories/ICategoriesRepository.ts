import { ICreateCategoryRequestDTO } from '../useCases/CreateCategory/CreateCategoryDTO';
import Category from '../schemas/Category';

export interface ICategoriesRepository {
    findByTitle(title: string): Promise<Category | undefined>;
    createAndSave(data: ICreateCategoryRequestDTO): Promise<Category>;
}
