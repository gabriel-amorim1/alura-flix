import sinon from 'sinon';
import { ListCategoriesController } from '../ListCategoriesController';
import { ListCategoriesUseCase } from '../ListCategoriesUseCase';

describe('ListCategoriesController Context', () => {
    let listCategoriesUseCaseSpy: sinon.SinonStubbedInstance<ListCategoriesUseCase>;
    let listCategoriesController: ListCategoriesController;
    let mockResponse: any;

    beforeEach(() => {
        listCategoriesUseCaseSpy = sinon.createStubInstance(ListCategoriesUseCase);
        listCategoriesController = new ListCategoriesController(
            listCategoriesUseCaseSpy as any,
        );

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

    it('should return all actives categories', async () => {
        const mockCategories: any = { data: ['category1', 'category2'], count: 2 };

        const request: any = { query: {} };

        listCategoriesUseCaseSpy.execute.resolves(mockCategories);

        const response = (await listCategoriesController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(mockCategories);
        expect(
            listCategoriesUseCaseSpy.execute.calledOnceWithExactly(false),
        ).toBeTruthy();
    });

    it('should return all actives and deleted categories', async () => {
        const mockCategories: any = { data: ['category1', 'category2'], count: 2 };

        const request: any = { query: { showDeletedCategories: true } };

        listCategoriesUseCaseSpy.execute.resolves(mockCategories);

        const response = (await listCategoriesController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(mockCategories);
        expect(
            listCategoriesUseCaseSpy.execute.calledOnceWithExactly(true),
        ).toBeTruthy();
    });
});
