import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import Category from '../../../schemas/Category';
import { RemoveCategoryController } from '../RemoveCategoryController';
import { RemoveCategoryUseCase } from '../RemoveCategoryUseCase';

describe('RemoveCategoryController Context', () => {
    let removeCategoryUseCaseSpy: sinon.SinonStubbedInstance<RemoveCategoryUseCase>;
    let removeCategoryController: RemoveCategoryController;
    let mockResponse: any;

    beforeEach(() => {
        removeCategoryUseCaseSpy = sinon.createStubInstance(RemoveCategoryUseCase);
        removeCategoryController = new RemoveCategoryController(
            removeCategoryUseCaseSpy as any,
        );

        mockResponse = () => {
            const response: any = {};

            response.status = (status: any) => {
                response.status = status;
                return response;
            };

            response.send = () => response;

            return response;
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should remove category and return status 204', async () => {
        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
        };

        const mockedCategory: Category = {
            _id: id as any,
            title: 'Test Title',
            color: '#000',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        };

        removeCategoryUseCaseSpy.execute.resolves(mockedCategory);

        const response = await removeCategoryController.handle(
            request,
            mockResponse(),
        );

        expect(response.status).toBe(204);
        expect(
            removeCategoryUseCaseSpy.execute.calledOnceWithExactly(id),
        ).toBeTruthy();
    });

    it('should return ValidationError when not send invalid id', async () => {
        expect.hasAssertions();

        const id = 'invalid-id';

        const request: any = {
            params: { id },
        };

        try {
            await removeCategoryController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['id'])).toBeTruthy();
            expect(removeCategoryUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });
});
