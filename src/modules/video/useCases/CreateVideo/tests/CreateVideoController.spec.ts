import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import { CreateVideoController } from '../CreateVideoController';
import { CreateVideoUseCase } from '../CreateVideoUseCase';

describe('Create Video Controller Context', () => {
    let createVideoUseCaseSpy: sinon.SinonStubbedInstance<CreateVideoUseCase>;
    let createVideoController: CreateVideoController;
    let mockResponse: any;

    beforeEach(() => {
        createVideoUseCaseSpy = sinon.createStubInstance(CreateVideoUseCase);
        createVideoController = new CreateVideoController(
            <any>createVideoUseCaseSpy,
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

    it('should return status 201 and the created video', async () => {
        const request = <any>{
            body: {
                title: 'Test title',
                description: 'Test description',
                url: 'http://www.test.com/',
            },
        };

        createVideoUseCaseSpy.execute.resolves(<any>'created video');

        const res = (await createVideoController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(res.body).toBe('created video');
        expect(res.code).toBe(201);
    });

    it('should return status 400 - ValidationError', async () => {
        expect.hasAssertions();

        const request = <any>{
            body: {
                url: 'invalid-url',
            },
        };

        try {
            await createVideoController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(
                verifyIfParamIsInErrors(error, ['title', 'description', 'url']),
            ).toBeTruthy();
        }
    });
});
