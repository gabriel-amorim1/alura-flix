import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { v4 } from 'uuid';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoCategoriesRepository } from '../../../../category/repositories/implementations/MongoCategoriesRepository';
import Category from '../../../../category/schemas/Category';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import { IVideosRepository } from '../../../repositories/IVideosRepository';
import Video from '../../../schemas/Video';
import { GetVideoByIdUseCase } from '../GetVideoByIdUseCase';

describe('GetVideoByIdUseCase Context', () => {
    let mongoVideosRepositorySpy: sinon.SinonStubbedInstance<IVideosRepository>;
    let mongoCategoriesRepositorySpy: sinon.SinonStubbedInstance<MongoCategoriesRepository>;
    let getVideoByIdUseCase: GetVideoByIdUseCase;

    beforeEach(() => {
        mongoVideosRepositorySpy = sinon.createStubInstance(MongoVideosRepository);

        mongoCategoriesRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );

        getVideoByIdUseCase = new GetVideoByIdUseCase(
            mongoVideosRepositorySpy,
            mongoCategoriesRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to find a video by id', async () => {
        const _id = new Bson_ObjectId().toHexString() as any;
        const category_id = new Bson_ObjectId().toHexString().toString();

        const mockCategory: Category = {
            _id: category_id as any,
            title: 'Title Test',
            color: '#FFF',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        const mockVideo: Video = {
            _id,
            title: 'title',
            description: 'description',
            url: 'url',
            category_id,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            category: mockCategory,
        };

        mongoVideosRepositorySpy.findById.resolves(mockVideo);
        mongoCategoriesRepositorySpy.findById.resolves(mockCategory);

        const videoFound = await getVideoByIdUseCase.execute(_id);

        expect(videoFound).toEqual(mockVideo);
        expect(_id).toBe(videoFound._id);
        expect(
            mongoVideosRepositorySpy.findById.calledOnceWithExactly(_id),
        ).toBeTruthy();
        expect(
            mongoCategoriesRepositorySpy.findById.calledOnceWithExactly(category_id),
        ).toBeTruthy();
    });

    it('should not be able to find a video by id - Video not found.', async () => {
        expect.hasAssertions();

        const _id = <any>v4();

        mongoVideosRepositorySpy.findById.resolves(undefined);

        try {
            await getVideoByIdUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Video not found');
            expect(
                mongoVideosRepositorySpy.findById.calledOnceWithExactly(_id),
            ).toBeTruthy();
            expect(mongoCategoriesRepositorySpy.findById.notCalled).toBeTruthy();
        }
    });
});
