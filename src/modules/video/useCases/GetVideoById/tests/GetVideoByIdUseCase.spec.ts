import sinon from 'sinon';
import { v4 } from 'uuid';
import { HttpError } from '../../../../../utils/errors/HttpError';
import { IVideosRepository } from '../../../repositories/IVideosRepository';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import Video from '../../../schemas/Video';
import { GetVideoByIdUseCase } from '../GetVideoByIdUseCase';

describe('GetVideoByIdUseCase Context', () => {
    let mongoVideosRepositorySpy: sinon.SinonStubbedInstance<IVideosRepository>;
    let getVideoByIdUseCase: GetVideoByIdUseCase;

    beforeEach(() => {
        mongoVideosRepositorySpy = sinon.createStubInstance(MongoVideosRepository);

        getVideoByIdUseCase = new GetVideoByIdUseCase(mongoVideosRepositorySpy);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to find a video by id', async () => {
        const _id = <any>v4();

        const video: Video = {
            _id,
            title: 'title',
            description: 'description',
            url: 'url',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        mongoVideosRepositorySpy.findById.resolves(video);

        const videoFound = await getVideoByIdUseCase.execute(_id);

        expect(videoFound).toEqual(video);
        expect(_id).toBe(videoFound._id);
        expect(
            mongoVideosRepositorySpy.findById.calledOnceWithExactly(_id),
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
        }
    });
});
