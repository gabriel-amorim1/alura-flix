import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import Video from '../../../schemas/Video';
import { RemoveVideoUseCase } from '../RemoveVideoUseCase';

describe('RemoveVideoUseCase Context', () => {
    let mongoVideosRepositorySpy: sinon.SinonStubbedInstance<MongoVideosRepository>;
    let removeVideoUseCase: RemoveVideoUseCase;

    beforeEach(() => {
        mongoVideosRepositorySpy = sinon.createStubInstance(MongoVideosRepository);
        removeVideoUseCase = new RemoveVideoUseCase(mongoVideosRepositorySpy);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to remove a video by id', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        const findByIdMockedVideo: Video = {
            _id,
            title: 'title',
            description: 'description',
            url: 'url',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        const removeMockedVideo: Video = {
            ...findByIdMockedVideo,
            deleted_at: new Date(),
        };

        mongoVideosRepositorySpy.findById.resolves(findByIdMockedVideo);
        mongoVideosRepositorySpy.remove.resolves(removeMockedVideo);

        const videoDeleted = await removeVideoUseCase.execute(_id);

        expect(videoDeleted).toEqual(removeMockedVideo);
        expect(
            mongoVideosRepositorySpy.findById.calledOnceWithExactly(_id),
        ).toBeTruthy();
        expect(
            mongoVideosRepositorySpy.remove.calledOnceWithExactly(
                findByIdMockedVideo,
            ),
        ).toBeTruthy();
    });

    it('should not be able to remove a video by id - Video not found', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        mongoVideosRepositorySpy.findById.resolves(undefined);

        try {
            await removeVideoUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Video not found');
            expect(
                mongoVideosRepositorySpy.findById.calledOnceWithExactly(_id),
            ).toBeTruthy();
            expect(mongoVideosRepositorySpy.remove.notCalled).toBeTruthy();
        }
    });

    it('should not be able to remove a video by id - This video is already deleted', async () => {
        const _id = new Bson_ObjectId().toHexString().toString() as any;

        const findByIdMockedVideo: Video = {
            _id,
            title: 'title',
            description: 'description',
            url: 'url',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        };

        mongoVideosRepositorySpy.findById.resolves(findByIdMockedVideo);

        try {
            await removeVideoUseCase.execute(_id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(400);
            expect(error.message).toBe('This video is already deleted');
            expect(
                mongoVideosRepositorySpy.findById.calledOnceWithExactly(_id),
            ).toBeTruthy();
            expect(mongoVideosRepositorySpy.remove.notCalled).toBeTruthy();
        }
    });
});
