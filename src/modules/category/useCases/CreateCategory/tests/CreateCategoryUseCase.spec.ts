import sinon from 'sinon';
import Bson_ObjectId from 'bson-objectid';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoCategoriesRepository } from '../../../repositories/implementations/MongoCategoriesRepository';
import { CreateCategoryUseCase } from '../CreateCategoryUseCase';
import { ICreateCategoryRequestDTO } from '../CreateCategoryDTO';

describe('CreateCategoryUseCase Context', () => {
    let mongoCategoriesRepositorySpy: sinon.SinonStubbedInstance<MongoCategoriesRepository>;
    let createCategoryUseCase: CreateCategoryUseCase;

    beforeEach(() => {
        mongoCategoriesRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );
        createCategoryUseCase = new CreateCategoryUseCase(
            mongoCategoriesRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to create a new category', async () => {
        const data: ICreateCategoryRequestDTO = {
            title: 'title',
            color: '#000',
        };

        const expectedRes = {
            ...data,
            _id: new Bson_ObjectId().toHexString() as any,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        mongoCategoriesRepositorySpy.findByTitle.resolves(undefined);
        mongoCategoriesRepositorySpy.createAndSave.resolves(expectedRes);

        const categoryCreated = await createCategoryUseCase.execute(data);

        expect(expectedRes).toEqual(categoryCreated);
    });

    it('should not be able to create a new category - title already registered', async () => {
        expect.hasAssertions();

        const data: ICreateCategoryRequestDTO = {
            title: 'title',
            color: '#000',
        };

        mongoCategoriesRepositorySpy.findByTitle.resolves(<any>'category');

        try {
            await createCategoryUseCase.execute(data);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(400);
            expect(error.message).toBe('This title is already registered.');
        }
    });
});
