import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoCategoriesRepository } from '../../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../../schemas/Category';
import { RemoveCategoryUseCase } from '../RemoveCategoryUseCase';

describe('RemoveCategoryUseCase Context', () => {
    let mongoCategoriesRepositorySpy: sinon.SinonStubbedInstance<MongoCategoriesRepository>;
    let removeCategoryUseCase: RemoveCategoryUseCase;

    beforeEach(() => {
        mongoCategoriesRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );
        removeCategoryUseCase = new RemoveCategoryUseCase(
            mongoCategoriesRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to remove a category by id', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        const findByIdMockedCategory: Category = {
            _id,
            title: 'Test title',
            color: 'white',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        const removeMockedCategory: Category = {
            ...findByIdMockedCategory,
            deleted_at: new Date(),
        };

        mongoCategoriesRepositorySpy.findById.resolves(findByIdMockedCategory);
        mongoCategoriesRepositorySpy.remove.resolves(removeMockedCategory);

        const categoryDeleted = await removeCategoryUseCase.execute(_id);

        expect(categoryDeleted).toEqual(removeMockedCategory);
        expect(
            mongoCategoriesRepositorySpy.findById.calledOnceWithExactly(_id),
        ).toBeTruthy();
        expect(
            mongoCategoriesRepositorySpy.remove.calledOnceWithExactly(
                findByIdMockedCategory,
            ),
        ).toBeTruthy();
    });

    it('should not be able to remove a category by id - Category not found', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        mongoCategoriesRepositorySpy.findById.resolves(undefined);

        try {
            await removeCategoryUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Category not found');
            expect(
                mongoCategoriesRepositorySpy.findById.calledOnceWithExactly(_id),
            ).toBeTruthy();
            expect(mongoCategoriesRepositorySpy.remove.notCalled).toBeTruthy();
        }
    });

    it('should not be able to remove a video by id - This video is already deleted', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        const findByIdMockedCategory: Category = {
            _id,
            title: 'Test title',
            color: 'white',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        };

        mongoCategoriesRepositorySpy.findById.resolves(findByIdMockedCategory);

        try {
            await removeCategoryUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(400);
            expect(error.message).toBe('This category is already deleted');
            expect(
                mongoCategoriesRepositorySpy.findById.calledOnceWithExactly(_id),
            ).toBeTruthy();
            expect(mongoCategoriesRepositorySpy.remove.notCalled).toBeTruthy();
        }
    });
});
