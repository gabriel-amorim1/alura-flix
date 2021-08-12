import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoCategoriesRepository } from '../../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../../schemas/Category';
import { RemoveCategoryUseCase } from '../RemoveCategoryUseCase';

describe('RemoveCategoryUseCase Context', () => {
    let mongoCategoriesRepository: sinon.SinonStubbedInstance<MongoCategoriesRepository>;
    let removeCategoryUseCase: RemoveCategoryUseCase;

    beforeEach(() => {
        mongoCategoriesRepository = sinon.createStubInstance(
            MongoCategoriesRepository,
        );
        removeCategoryUseCase = new RemoveCategoryUseCase(mongoCategoriesRepository);
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

        mongoCategoriesRepository.findById.resolves(findByIdMockedCategory);
        mongoCategoriesRepository.remove.resolves(removeMockedCategory);

        const categoryDeleted = await removeCategoryUseCase.execute(_id);

        expect(categoryDeleted).toEqual(removeMockedCategory);
        expect(
            mongoCategoriesRepository.findById.calledOnceWithExactly(_id),
        ).toBeTruthy();
        expect(
            mongoCategoriesRepository.remove.calledOnceWithExactly(
                findByIdMockedCategory,
            ),
        ).toBeTruthy();
    });

    it('should be able to remove a category by id - Category not found', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        mongoCategoriesRepository.findById.resolves(undefined);

        try {
            await removeCategoryUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Category not found');
            expect(
                mongoCategoriesRepository.findById.calledOnceWithExactly(_id),
            ).toBeTruthy();
            expect(mongoCategoriesRepository.remove.notCalled).toBeTruthy();
        }
    });
});
