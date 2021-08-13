import sinon from 'sinon';
import { MongoCategoriesRepository } from '../../../repositories/implementations/MongoCategoriesRepository';
import { ListCategoriesUseCase } from '../ListCategoriesUseCase';

describe('ListCategoriesUseCase Context', () => {
    let mongoCategoriesRepositorySpy: sinon.SinonStubbedInstance<MongoCategoriesRepository>;
    let listCategoriesUseCase: ListCategoriesUseCase;

    beforeEach(() => {
        mongoCategoriesRepositorySpy = sinon.createStubInstance(
            MongoCategoriesRepository,
        );

        listCategoriesUseCase = new ListCategoriesUseCase(
            mongoCategoriesRepositorySpy,
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be able to list all categories', async () => {
        const mockCategories: any = ['category1', 'category2'];

        mongoCategoriesRepositorySpy.list.resolves(mockCategories);

        const categories = await listCategoriesUseCase.execute(true);

        expect(categories).toEqual(mockCategories);
        expect(
            mongoCategoriesRepositorySpy.list.calledOnceWithExactly({}),
        ).toBeTruthy();
    });

    it('should be able to list all categories - show deleted categories', async () => {
        const mockCategories: any = ['category1', 'category2'];

        mongoCategoriesRepositorySpy.list.resolves(mockCategories);

        const categories = await listCategoriesUseCase.execute(false);

        const options = { where: { deleted_at: null } };

        expect(categories).toEqual(mockCategories);
        expect(
            mongoCategoriesRepositorySpy.list.calledOnceWithExactly(options),
        ).toBeTruthy();
    });
});
