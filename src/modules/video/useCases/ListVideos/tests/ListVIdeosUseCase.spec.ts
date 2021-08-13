import sinon from 'sinon';
import { MongoVideosRepository } from '../../../repositories/implementations/MongoVideosRepository';
import { ListVideosUseCase } from '../ListVideosUseCase';

describe('ListVideosUseCase Context', () => {
    let mongoVideosRepositorySpy: sinon.SinonStubbedInstance<MongoVideosRepository>;
    let listVideosUseCase: ListVideosUseCase;

    beforeEach(() => {
        mongoVideosRepositorySpy = sinon.createStubInstance(MongoVideosRepository);

        listVideosUseCase = new ListVideosUseCase(mongoVideosRepositorySpy);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to list all videos', async () => {
        const mockVideos: any = ['video1', 'video2'];

        mongoVideosRepositorySpy.list.resolves(mockVideos);

        const videos = await listVideosUseCase.execute(true);

        expect(videos).toEqual(mockVideos);
        expect(mongoVideosRepositorySpy.list.calledOnceWithExactly({})).toBeTruthy();
    });

    it('should be able to list all videos - show deleted videos', async () => {
        const mockVideos: any = ['video1', 'video2'];

        mongoVideosRepositorySpy.list.resolves(mockVideos);

        const videos = await listVideosUseCase.execute(false);

        const options = { where: { deleted_at: null } };

        expect(videos).toEqual(mockVideos);
        expect(
            mongoVideosRepositorySpy.list.calledOnceWithExactly(options),
        ).toBeTruthy();
    });
});
