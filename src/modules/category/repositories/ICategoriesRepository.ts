import Category from '../schemas/Category';
import { ICreateCategoryRequestDTO } from '../useCases/CreateCategory/CreateCategoryDTO';
import { IUpdateCategoryRequestDTO } from '../useCases/UpdateCategory/UpdateCategoryDTO';

export interface ICategoriesRepository {
    findByTitle(title: string): Promise<Category | undefined>;
    findById(id: string): Promise<Category | undefined>;
    createAndSave(
        data: ICreateCategoryRequestDTO | IUpdateCategoryRequestDTO,
    ): Promise<Category>;
    list(): Promise<{ data: Category[]; count: number }>;
}
