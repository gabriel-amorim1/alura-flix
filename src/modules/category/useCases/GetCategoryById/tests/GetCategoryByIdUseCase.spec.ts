import sinon from 'sinon';
import { v4 } from 'uuid';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../../schemas/Category';
import { GetCategoryByIdUseCase } from '../GetCategoryByIdUseCase';

describe('GetCategoryByIdUseCase Context', () => {
    let mongoCategoryRepositorySpy: sinon.SinonStubbedInstance<ICategoriesRepository>;
    let getCategoryByIdUseCase: GetCategoryByIdUseCase;

    beforeEach(() => {
        mongoCategoryRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );

        getCategoryByIdUseCase = new GetCategoryByIdUseCase(
            mongoCategoryRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to find a category by id', async () => {
        const _id = <any>v4();

        const category: Category = {
            _id,
            title: 'Test title',
            color: 'white',
            created_at: new Date(),
            updated_at: new Date(),
        };

        mongoCategoryRepositorySpy.findById.resolves(category);

        const categoryFound = await getCategoryByIdUseCase.execute(_id);

        expect(categoryFound).toEqual(category);
        expect(_id).toBe(categoryFound._id);
        expect(
            mongoCategoryRepositorySpy.findById.calledOnceWithExactly(_id),
        ).toBeTruthy();
    });

    it('should not be able to find a category by id - Category not found', async () => {
        expect.hasAssertions();

        const _id = <any>v4();

        mongoCategoryRepositorySpy.findById.resolves(undefined);

        try {
            await getCategoryByIdUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Category not found');
        }
    });
});
