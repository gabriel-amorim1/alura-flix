import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { MongoCategoriesRepository } from '../../../repositories/implementations/MongoCategoriesRepository';
import Category from '../../../schemas/Category';
import { UpdateCategoryUseCase } from '../UpdateCategoryUseCase';

describe('UpdateCategoryUseCase Context', () => {
    let mongoCategoryRepositorySpy: sinon.SinonStubbedInstance<ICategoriesRepository>;
    let updateCategoryUseCase: UpdateCategoryUseCase;

    beforeEach(() => {
        mongoCategoryRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );

        updateCategoryUseCase = new UpdateCategoryUseCase(
            mongoCategoryRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to update a category by id', async () => {
        const id = new Bson_ObjectId().toHexString().toString();

        const updateBody = {
            title: 'Test Title Update',
            color: 'Test Color Update',
        };

        const findByIdMockedCategory: Category = {
            _id: id as any,
            title: 'Test Title',
            color: 'Test Color',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const updateMockedCategory: Category = {
            ...findByIdMockedCategory,
            ...updateBody,
            updated_at: new Date(),
        };

        mongoCategoryRepositorySpy.findById.resolves(findByIdMockedCategory);
        mongoCategoryRepositorySpy.findByTitle.resolves(undefined);
        mongoCategoryRepositorySpy.createAndSave.resolves(updateMockedCategory);

        const categoryUpdated = await updateCategoryUseCase.execute(id, updateBody);

        expect(categoryUpdated).toEqual(updateMockedCategory);
        expect(
            mongoCategoryRepositorySpy.findById.calledOnceWithExactly(id),
        ).toBeTruthy();
        expect(
            mongoCategoryRepositorySpy.findByTitle.calledOnceWithExactly(
                updateBody.title,
            ),
        ).toBeTruthy();
        expect(
            mongoCategoryRepositorySpy.createAndSave.calledOnceWithExactly(
                updateMockedCategory,
            ),
        ).toBeTruthy();
    });
});
