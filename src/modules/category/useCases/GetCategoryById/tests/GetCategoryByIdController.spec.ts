import sinon from 'sinon';
import { v4 } from 'uuid';
import { GetCategoryByIdController } from '../GetCategoryByIdController';
import { GetCategoryByIdUseCase } from '../GetCategoryByIdUseCase';

describe('GetCategoryByIdController Context', () => {
    let getCategoryByIdUseCaseSpy: sinon.SinonStubbedInstance<GetCategoryByIdUseCase>;
    let getCategoryByIdController: GetCategoryByIdController;
    let mockResponse: any;

    beforeEach(() => {
        getCategoryByIdUseCaseSpy = sinon.createStubInstance(GetCategoryByIdUseCase);
        getCategoryByIdController = new GetCategoryByIdController(
            <any>getCategoryByIdUseCaseSpy,
        );

        mockResponse = () => {
            const response: any = {};

            response.json = (body: any) => {
                response.body = body;
                return response;
            };

            return response;
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return status 200 and category found', async () => {
        const request: any = { params: { id: v4() } };

        getCategoryByIdUseCaseSpy.execute.resolves(<any>request.params.id);

        const response = (await getCategoryByIdController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(request.params.id);
    });
});
