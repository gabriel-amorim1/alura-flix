import Bson_ObjectId from 'bson-objectid';
import Category from 'modules/category/schemas/Category';
import sinon from 'sinon';
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
                color: 'Test Color Update',
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
});
