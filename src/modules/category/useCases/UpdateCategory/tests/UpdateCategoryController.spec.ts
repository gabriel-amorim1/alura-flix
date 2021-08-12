import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import Category from '../../../schemas/Category';
import { UpdateCategoryController } from '../UpdateCategoryController';
import { UpdateCategoryUseCase } from '../UpdateCategoryUseCase';

describe('UpdateCategoryController Context', () => {
    let updateCategoryUseCaseSpy: sinon.SinonStubbedInstance<UpdateCategoryUseCase>;
    let updateCategoryController: UpdateCategoryController;
    let mockResponse: any;

    beforeEach(() => {
        updateCategoryUseCaseSpy = sinon.createStubInstance(UpdateCategoryUseCase);
        updateCategoryController = new UpdateCategoryController(
            <any>updateCategoryUseCaseSpy,
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

    it('should return status 200 and category updated', async () => {
        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
            body: {
                title: 'Test Title Update',
                color: '#000',
            },
        };

        const updateMockedCategory: Category = {
            _id: id as any,
            ...request.body,
            created_at: new Date(),
            updated_at: new Date(),
        };

        updateCategoryUseCaseSpy.execute.resolves(updateMockedCategory);

        const response = (await updateCategoryController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(updateMockedCategory);
        expect(
            updateCategoryUseCaseSpy.execute.calledOnceWithExactly(id, request.body),
        ).toBeTruthy();
    });

    it('should return ValidationError when not send params', async () => {
        expect.hasAssertions();

        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
            body: {},
        };

        try {
            await updateCategoryController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(
                error.errors.includes('At least one property is required.'),
            ).toBeTruthy();
            expect(updateCategoryUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });

    it('should return ValidationError when not send invalid params', async () => {
        expect.hasAssertions();

        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
            body: { color: 'invalid-color' },
        };

        try {
            await updateCategoryController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['color'])).toBeTruthy();
            expect(updateCategoryUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });

    it('should return ValidationError when not send invalid id', async () => {
        expect.hasAssertions();

        const id = 'invalid-id';

        const request: any = {
            params: { id },
            body: {
                title: 'Test Title Update',
                color: '#000',
            },
        };

        try {
            await updateCategoryController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['id'])).toBeTruthy();
            expect(updateCategoryUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });
});
