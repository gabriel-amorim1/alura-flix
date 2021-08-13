import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoCategoriesRepository } from '../../../../category/repositories/implementations/MongoCategoriesRepository';
import Category from '../../../../category/schemas/Category';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import Video from '../../../schemas/Video';
import { ICreateVideoRequestDTO } from '../CreateVideoDTO';
import { CreateVideoUseCase } from '../CreateVideoUseCase';

describe('CreateVideoUseCase Context', () => {
    let mongoVideosRepositorySpy: sinon.SinonStubbedInstance<MongoVideosRepository>;
    let mongoCategoriesRepositorySpy: sinon.SinonStubbedInstance<MongoCategoriesRepository>;
    let createVideoUseCase: CreateVideoUseCase;

    beforeEach(() => {
        mongoVideosRepositorySpy = sinon.createStubInstance(MongoVideosRepository);

        mongoCategoriesRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );

        createVideoUseCase = new CreateVideoUseCase(
            mongoVideosRepositorySpy,
            mongoCategoriesRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to create a new video', async () => {
        const category_id = new Bson_ObjectId().toHexString().toString();

        const data: ICreateVideoRequestDTO = {
            title: 'title',
            description: 'description',
            url: 'url',
            category_id,
        };

        const mockCategory: Category = {
            _id: category_id as any,
            title: 'Title Test',
            color: '#FFF',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        const expectedRes: Video = {
            ...data,
            _id: new Bson_ObjectId().toHexString() as any,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            category: mockCategory,
        };

        mongoVideosRepositorySpy.findByUrl.resolves(undefined);
        mongoCategoriesRepositorySpy.findById.resolves(mockCategory);
        mongoVideosRepositorySpy.createAndSave.resolves(expectedRes);

        const videoCreated = await createVideoUseCase.execute(data);

        expect(expectedRes).toEqual(videoCreated);
        expect(
            mongoVideosRepositorySpy.findByUrl.calledOnceWithExactly(data.url),
        ).toBeTruthy();
        expect(
            mongoCategoriesRepositorySpy.findById.calledOnceWithExactly(category_id),
        ).toBeTruthy();
        expect(
            mongoVideosRepositorySpy.createAndSave.calledOnceWithExactly(data),
        ).toBeTruthy();
    });

    it('should not be able to create a new video - Url already registered', async () => {
        expect.hasAssertions();

        const data: ICreateVideoRequestDTO = {
            title: 'title',
            description: 'description',
            url: 'url',
            category_id: new Bson_ObjectId().toHexString().toString(),
        };

        mongoVideosRepositorySpy.findByUrl.resolves(<any>'video');

        try {
            await createVideoUseCase.execute(data);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(400);
            expect(error.message).toBe('Url already registered');
            expect(
                mongoVideosRepositorySpy.findByUrl.calledOnceWithExactly(data.url),
            ).toBeTruthy();
            expect(mongoCategoriesRepositorySpy.findById.notCalled).toBeTruthy();
            expect(mongoVideosRepositorySpy.createAndSave.notCalled).toBeTruthy();
        }
    });

    it('should not be able to create a new video - Category not found', async () => {
        expect.hasAssertions();

        const data: ICreateVideoRequestDTO = {
            title: 'title',
            description: 'description',
            url: 'url',
            category_id: new Bson_ObjectId().toHexString().toString(),
        };

        mongoVideosRepositorySpy.findByUrl.resolves(undefined);
        mongoCategoriesRepositorySpy.findById.resolves(undefined);

        try {
            await createVideoUseCase.execute(data);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Category not found');
        }
    });
});
