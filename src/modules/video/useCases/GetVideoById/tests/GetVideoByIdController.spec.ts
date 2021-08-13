import sinon from 'sinon';
import Bson_ObjectId from 'bson-objectid';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import { GetVideoByIdController } from '../GetVideoByIdController';
import { GetVideoByIdUseCase } from '../GetVideoByIdUseCase';

describe('GetVideoByIdController Context', () => {
    let getVideoByIdUseCaseSpy: sinon.SinonStubbedInstance<GetVideoByIdUseCase>;
    let getVideoByIdController: GetVideoByIdController;
    let mockResponse: any;

    beforeEach(() => {
        getVideoByIdUseCaseSpy = sinon.createStubInstance(GetVideoByIdUseCase);
        getVideoByIdController = new GetVideoByIdController(
            <any>getVideoByIdUseCaseSpy,
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
    it('should return status 200 and video found', async () => {
        const request: any = {
            params: { id: new Bson_ObjectId().toHexString().toString() },
        };

        getVideoByIdUseCaseSpy.execute.resolves(<any>request.params.id);

        const response = (await getVideoByIdController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(request.params.id);
    });

    it('should return an ValidationError - Id not valid', async () => {
        expect.hasAssertions();

        const request: any = { params: { id: 'invalid-id' } };

        try {
            await getVideoByIdController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['id'])).toBeTruthy();
        }
    });
});
