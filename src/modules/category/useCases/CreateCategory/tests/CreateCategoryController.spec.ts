import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import { CreateCategoryController } from '../CreateCategoryController';
import { CreateCategoryUseCase } from '../CreateCategoryUseCase';

describe('Create Category Controller Context', () => {
    let createCategoryUseCaseSpy: sinon.SinonStubbedInstance<CreateCategoryUseCase>;
    let createCategoryController: CreateCategoryController;
    let mockResponse: any;

    beforeEach(() => {
        createCategoryUseCaseSpy = sinon.createStubInstance(CreateCategoryUseCase);
        createCategoryController = new CreateCategoryController(
            <any>createCategoryUseCaseSpy,
        );

        mockResponse = () => {
            const res: any = {};

            res.status = (code: number) => {
                res.code = code;
                return res;
            };

            res.json = (body: any) => {
                res.body = body;
                return res;
            };

            return res;
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return status 201 and the created category', async () => {
        const request = <any>{
            body: {
                title: 'Test title',
                color: '#000',
            },
        };

        createCategoryUseCaseSpy.execute.resolves(<any>'created category');

        const res = (await createCategoryController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(res.body).toBe('created category');
        expect(res.code).toBe(201);
    });

    it('should return status 400 - ValidationError', async () => {
        expect.hasAssertions();

        const request = <any>{
            body: {
                color: 'invalid-color',
            },
        };

        try {
            await createCategoryController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['title', 'color'])).toBeTruthy();
        }
    });
});
