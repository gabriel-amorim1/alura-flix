import sinon from 'sinon';
import { ListVideosController } from '../ListVideosController';
import { ListVideosUseCase } from '../ListVideosUseCase';

describe('ListVideosController Context', () => {
    let listVideosUseCaseSpy: sinon.SinonStubbedInstance<ListVideosUseCase>;
    let listVideosController: ListVideosController;
    let mockResponse: any;

    beforeEach(() => {
        listVideosUseCaseSpy = sinon.createStubInstance(ListVideosUseCase);
        listVideosController = new ListVideosController(listVideosUseCaseSpy as any);

        mockResponse = () => {
            const response: any = {};

            response.json = (data: any) => {
                response.body = data;
                return response;
            };

            return response;
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return all actives videos', async () => {
        const mockVideos: any = { data: ['video1', 'video2'], count: 2 };

        const request: any = { query: {} };

        listVideosUseCaseSpy.execute.resolves(mockVideos);

        const response = (await listVideosController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(mockVideos);
        expect(
            listVideosUseCaseSpy.execute.calledOnceWithExactly(false),
        ).toBeTruthy();
    });

    it('should return all actives and deleted videos', async () => {
        const mockVideos: any = { data: ['video1', 'video2'], count: 2 };

        const request: any = { query: { showDeletedVideos: true } };

        listVideosUseCaseSpy.execute.resolves(mockVideos);

        const response = (await listVideosController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(mockVideos);
        expect(
            listVideosUseCaseSpy.execute.calledOnceWithExactly(true),
        ).toBeTruthy();
    });
});
