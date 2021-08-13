import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import { CreateVideoController } from '../CreateVideoController';
import { CreateVideoUseCase } from '../CreateVideoUseCase';

describe('CreateVideoController Context', () => {
    let createVideoUseCaseSpy: sinon.SinonStubbedInstance<CreateVideoUseCase>;
    let createVideoController: CreateVideoController;
    let mockResponse: any;

    beforeEach(() => {
        createVideoUseCaseSpy = sinon.createStubInstance(CreateVideoUseCase);
        createVideoController = new CreateVideoController(
            <any>createVideoUseCaseSpy,
        );

        mockResponse = () => {
            const response: any = {};

            response.status = (code: number) => {
                response.code = code;
                return response;
            };

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

    it('should return status 201 and the created video', async () => {
        const request = <any>{
            body: {
                title: 'Test title',
                description: 'Test description',
                url: 'http://www.test.com/',
                category_id: new Bson_ObjectId().toHexString().toString(),
            },
        };

        createVideoUseCaseSpy.execute.resolves(<any>'created video');

        const response = (await createVideoController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toBe('created video');
        expect(response.code).toBe(201);
    });

    it('should return ValidationError - invalid params', async () => {
        expect.hasAssertions();

        const request = <any>{
            body: {
                url: 'invalid-url',
                category_id: 'invalid-id',
            },
        };

        try {
            await createVideoController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(
                verifyIfParamIsInErrors(error, [
                    'title',
                    'description',
                    'url',
                    'category_id',
                ]),
            ).toBeTruthy();
        }
    });
});
