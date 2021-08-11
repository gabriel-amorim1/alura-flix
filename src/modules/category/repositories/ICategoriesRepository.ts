import { ICreateCategoryRequestDTO } from '../useCases/CreateCategory/CreateCategoryDTO';
import Category from '../schemas/Category';

export interface ICategoriesRepository {
    findByTitle(title: string): Promise<Category | undefined>;
    findById(id: string): Promise<Category | undefined>;
    createAndSave(data: ICreateCategoryRequestDTO): Promise<Category>;
    list(): Promise<{ data: Category[]; count: number }>;
}
