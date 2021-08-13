import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { IVideosRepository } from '../../../repositories/IVideosRepository';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import Video from '../../../schemas/Video';
import { UpdateVideoUseCase } from '../UpdateVideoUseCase';

describe('UpdateVideoUseCase Context', () => {
    let mongoVideoRepositorySpy: sinon.SinonStubbedInstance<IVideosRepository>;
    let updateVideoUseCase: UpdateVideoUseCase;

    beforeEach(() => {
        mongoVideoRepositorySpy = sinon.createStubInstance(MongoVideosRepository);

        updateVideoUseCase = new UpdateVideoUseCase(mongoVideoRepositorySpy);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to update a video by id', async () => {
        const id = new Bson_ObjectId().toHexString().toString();

        const updateBody = {
            title: 'Test Title Update',
            description: 'Test Description Update',
            url: 'Test Url Update',
        };
        const findByIdMockedVideo: Video = {
            _id: id as any,
            title: 'Test Title',
            description: 'Test Description',
            url: 'Test Url',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        const updateMockedVideo: Video = {
            ...findByIdMockedVideo,
            ...updateBody,
            updated_at: new Date(),
        };

        mongoVideoRepositorySpy.findById.resolves(findByIdMockedVideo);
        mongoVideoRepositorySpy.findByUrl.resolves(undefined);
        mongoVideoRepositorySpy.createAndSave.resolves(updateMockedVideo);

        const videoUpdated = await updateVideoUseCase.execute(id, updateBody);

        expect(videoUpdated).toEqual(updateMockedVideo);
        expect(
            mongoVideoRepositorySpy.findById.calledOnceWithExactly(id),
        ).toBeTruthy();
        expect(
            mongoVideoRepositorySpy.findByUrl.calledOnceWithExactly(updateBody.url),
        ).toBeTruthy();
        expect(
            mongoVideoRepositorySpy.createAndSave.calledOnceWithExactly(
                updateMockedVideo,
            ),
        ).toBeTruthy();
    });

    it('should not be able to update a video by id - Video not found', async () => {
        expect.hasAssertions();

        const id = new Bson_ObjectId().toHexString().toString();

        mongoVideoRepositorySpy.findById.resolves(undefined);

        try {
            await updateVideoUseCase.execute(id, {});
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(404);
            expect(error.message).toBe('Video not found');
            expect(
                mongoVideoRepositorySpy.findById.calledOnceWithExactly(id),
            ).toBeTruthy();
            expect(mongoVideoRepositorySpy.findByUrl.notCalled).toBeTruthy();
            expect(mongoVideoRepositorySpy.createAndSave.notCalled).toBeTruthy();
        }
    });

    it('should not be able to update a video by id - Title is already registered', async () => {
        expect.hasAssertions();

        const id = new Bson_ObjectId().toHexString().toString();

        const updateBody = {
            title: 'Test Title Update',
            description: 'Test Description Update',
            url: 'Test Url Update',
        };

        const findByIdMockedVideo: Video = {
            _id: id as any,
            title: 'Test Title',
            description: 'Test Description',
            url: 'Test Url',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        mongoVideoRepositorySpy.findById.resolves(findByIdMockedVideo);
        mongoVideoRepositorySpy.findByUrl.resolves(findByIdMockedVideo);

        try {
            await updateVideoUseCase.execute(id, updateBody);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.code).toBe(400);
            expect(error.message).toBe('This url is already registered');
            expect(
                mongoVideoRepositorySpy.findById.calledOnceWithExactly(id),
            ).toBeTruthy();
            expect(
                mongoVideoRepositorySpy.findByUrl.calledOnceWithExactly(
                    updateBody.url,
                ),
            ).toBeTruthy();
            expect(mongoVideoRepositorySpy.createAndSave.notCalled).toBeTruthy();
        }
    });
});
