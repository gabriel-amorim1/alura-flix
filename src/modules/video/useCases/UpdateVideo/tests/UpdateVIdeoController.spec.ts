import Bson_ObjectId from 'bson-objectid';
import sinon from 'sinon';
import { ValidationError } from 'yup';
import { verifyIfParamIsInErrors } from '../../../../../utils/errors/functions/verifyIfParamIsInErrors';
import Video from '../../../schemas/Video';
import { UpdateVideoController } from '../UpdateVideoController';
import { UpdateVideoUseCase } from '../UpdateVideoUseCase';

describe('UpdateVideoController Context', () => {
    let updateVideoUseCaseSpy: sinon.SinonStubbedInstance<UpdateVideoUseCase>;
    let updateVideoController: UpdateVideoController;
    let mockResponse: any;

    beforeEach(() => {
        updateVideoUseCaseSpy = sinon.createStubInstance(UpdateVideoUseCase);
        updateVideoController = new UpdateVideoController(
            <any>updateVideoUseCaseSpy,
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

    it('should return status 200 and video updated', async () => {
        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
            body: {
                title: 'Test Title Update',
                description: 'Test Description Update',
                url: 'http://www.test.com/update',
            },
        };

        const updateMockedVideo: Video = {
            _id: id as any,
            ...request.body,
            created_at: new Date(),
            updated_at: new Date(),
        };

        updateVideoUseCaseSpy.execute.resolves(updateMockedVideo);

        const response = (await updateVideoController.handle(
            request,
            mockResponse(),
        )) as any;

        expect(response.body).toEqual(updateMockedVideo);
        expect(
            updateVideoUseCaseSpy.execute.calledOnceWithExactly(id, request.body),
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
            await updateVideoController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(
                error.errors.includes('At least one property is required.'),
            ).toBeTruthy();
            expect(updateVideoUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });

    it('should return ValidationError when not send invalid params', async () => {
        expect.hasAssertions();

        const id = new Bson_ObjectId().toHexString().toString();

        const request: any = {
            params: { id },
            body: { url: 'invalid-url' },
        };

        try {
            await updateVideoController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['url'])).toBeTruthy();
            expect(updateVideoUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });

    it('should return ValidationError when not send invalid id', async () => {
        expect.hasAssertions();

        const id = 'invalid-id';

        const request: any = {
            params: { id },
            body: {
                title: 'Test Title Update',
                description: 'Test Description Update',
                url: 'http://www.test.com/update',
            },
        };

        try {
            await updateVideoController.handle(request, mockResponse());
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(verifyIfParamIsInErrors(error, ['id'])).toBeTruthy();
            expect(updateVideoUseCaseSpy.execute.notCalled).toBeTruthy();
        }
    });
});
