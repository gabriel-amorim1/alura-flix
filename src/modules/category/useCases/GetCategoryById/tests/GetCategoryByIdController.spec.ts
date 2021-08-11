import sinon from 'sinon';
import Bson_ObjectId from 'bson-objectid';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
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
        const request: any = {
            params: { id: new Bson_ObjectId().toHexString().toString() },
        };

        getCategoryByIdUseCaseSpy.execute.resolves(<any>request.params.id);

        const response = (await getCategoryByIdController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(request.params.id);
    });

    it('should return an ValidationError - Id not valid', async () => {
        expect.hasAssertions();

        const request: any = { params: { id: 'invalid-id' } };

        try {
            await getCategoryByIdController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['id'])).toBeTruthy();
        }
    });
});
